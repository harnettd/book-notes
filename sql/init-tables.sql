DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
    edition_key text PRIMARY KEY,
    title text NOT NULL,
    first_publication_year date NOT NULL,
    cover_art_url text
);

DROP TABLE IF EXISTS authors CASCADE;
CREATE TABLE authors (
    author_key text PRIMARY KEY,
    author_name text NOT NULL
);

DROP TABLE IF EXISTS authors_books;
CREATE TABLE authors_books (
    id SERIAL PRIMARY KEY,
    edition_key text NOT NULL REFERENCES books,
    author_key text NOT NULL REFERENCES authors
);

DROP TABLE IF EXISTS personal_notes;
CREATE TABLE personal_notes (
    id SERIAL PRIMARY KEY,
    edition_key text NOT NULL REFERENCES books,
    date_finished date NOT NULL,
    comments text,
    rating integer CHECK (rating >= 0 AND rating <= 5)
);
