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
    // TODO: CHeck if the author is already in the database.
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

export { addNewBook };
