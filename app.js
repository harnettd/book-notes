import express from "express";
import { Client } from "pg";
import { user, password } from "./secrets/secrets.js";
import { addNewBook, getBooks } from "./modules/database-api.js";

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
const port = 5000;

// await addNewBook(client, appData.books[1]);

app.get("/", async (req, res) => {
  const books = await getBooks(client);
  res.render("index.ejs", { books });
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
