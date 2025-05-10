import express from "express";
import pg from "pg";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = 3000;

const appData = {
    books: [
        {
            title: "One Market Under God",
            authors: ["Thomas Frank"],
            coverUrl: "https://covers.openlibrary.org/b/olid/OL7440480M-M.jpg",
            dateFinished: new Date(2025, 5, 10),
            description: "A book about free market fundamentalism",
            rating: 4,
        }, 
        {
            title: "The Corporation",
            authors: ["Joel Bakan"],
            coverUrl: "https://covers.openlibrary.org/b/olid/OL7928295M-M.jpg",
            dateFinished: new Date(2025, 4, 30),
            description: "Compares corporations to psychopaths",
            rating: 5,
        }
    ]
};

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
    console.log(`App running on port ${port}`)
});
