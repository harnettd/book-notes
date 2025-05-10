import express from "express";
import pg from "pg";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/", (req, res) => {
    res.render("index.ejs");
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
    console.log(`App running on port ${port}`)
});
