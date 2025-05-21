const addNewBook = async (
  client,
  {
    editionKey,
    title,
    authors,
    firstPublishYear,
    coverUrl,
    dateFinished,
    comments,
    rating,
  }
) => {
  // TODO: Check if the book is already in the database.
  let text = `
        INSERT INTO books VALUES 
          ($1, $2, $3, $4);
    `;
  let values = [editionKey, title, firstPublishYear, coverUrl];
  await client.query(text, values);

  authors.forEach(async ({ key, name }) => {
    // TODO: Check if the author is already in the database.
    text = `
      INSERT INTO authors VALUES
        ($1, $2);
    `;
    values = [key, name];
    await client.query(text, values);

    text = `
      INSERT INTO authors_books VALUES
        (DEFAULT, $1, $2);
    `;
    values = [editionKey, key];
    await client.query(text, values);
  });

  text = `
    INSERT INTO personal_notes VALUES
      (DEFAULT, $1, $2, $3, $4);
  `;
  values = [editionKey, dateFinished, comments, rating];
  await client.query(text, values);
};

const getAuthorNames = (client, editionKey) => {
  const text = `
          SELECT
            author_name
          FROM books
          JOIN authors_books using(edition_key)
          JOIN authors using(author_key)
          WHERE edition_key = $1;
        `;
  const values = [editionKey];
  return new Promise((fulfill, reject) => {
    client.query(text, values)
      .then((results) => {
        const authors = results.rows;
        const authorNames = authors.map(({ author_name }) => author_name);
        fulfill(authorNames);
      })
      .catch((err) => reject(err));
  });
};
  
const addAuthorsToBooks = (books, authorNamesArrays) => {
  // The arrays books and authorNamesArrays ought to be of the same length.
  return books.map((book, idx) => {
    return {
      ...book,
      authorNames: authorNamesArrays[idx],
    };
  });
};

const getBooks = async (client) => {
  let text = `
        SELECT 
	        edition_key,
	        title,
	        first_publication_year,
	        cover_art_url,
	        date_finished,
	        comments,
	        rating
        FROM books
        JOIN personal_notes USING(edition_key);
      `;
  const results = await client.query(text);
  const books = results.rows;
  const getAllAuthorNames = books.map(({ edition_key }) => {
    // console.log(edition_key);
    return getAuthorNames(client, edition_key);
  });
  // getAllAuthorNames.forEach((p) => {
  //   console.log(p);
  //   console.log(p.result);
  // });
  return Promise.all(getAllAuthorNames)
    .then((authorNamesArrays) => addAuthorsToBooks(books, authorNamesArrays));
  };

export { addNewBook, getBooks };
