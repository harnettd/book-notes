import express from "express";
import { Client } from "pg";
import { user, password } from "./secrets/secrets.js";
import { addNewBook } from "./modules/database-api.js";

const client = new Client({
  user,
  password,
  host: "localhost",
  port: 5433,
  database: "nonfiction_books",
});
await client.connect();

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// const appData = {
//   books: [
//     {
//       editionKey: "OL2668554W",
//       title: "One Market Under God",
//       authors: [{ key: "OL389289A", name: "Thomas Frank" }],
//       firstPublishYear: 2000,
//       coverUrl: "https://covers.openlibrary.org/b/olid/OL7440480M-M.jpg",
//       dateFinished: new Date(2025, 5, 10),
//       comments: "A book about free market fundamentalism",
//       rating: 4,
//     },
//     {
//       editionKey: "OL2887824W",
//       title: "The Corporation",
//       authors: [{ key: "OL437980A", name: "Joel Bakan" }],
//       firstPublishYear: 2004,
//       coverUrl: "https://covers.openlibrary.org/b/olid/OL7928295M-M.jpg",
//       dateFinished: new Date(2025, 4, 30),
//       comments: "Compares corporations to psychopaths",
//       rating: 5,
//     },
//   ],
// };

// await addNewBook(client, appData.books[0]);
// await addNewBook(client, appData.books[1]);

app.get("/", (req, res) => {
  res.render("index.ejs", appData);
});

app.post("/create", (req, res) => {
  const body = req.body;
  res.redirect("/");
});

app.post("/update", (req, res) => {
  const body = req.body;
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const body = req.body;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
