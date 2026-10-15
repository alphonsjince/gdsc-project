const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

const port = 8080;
let notes = [
  {
    id: "1a",
    title: "C Code for first sem",
    content: "If else condition loop code functions",
    subject: "C programming",
    createdDate: "created on 15/10/2026",
    updatedDate: "last updated on 15/10/2026",
  },
  {
    id: "2b",
    title: "EEE Basics for first sem",
    content: "KVL KCL mesh analysis and nodal analysis network theorems",
    subject: "EEE",
    createdDate: "created on 15/10/2026",
    updatedDate: "last updated on 15/10/2026",
  },
  {
    id: "3c",
    title: "Physics Lab and Theory",
    content: "Laser interference diffraction and quantum mechanics basics",
    subject: "Physics",
    createdDate: "created on 15/10/2026",
    updatedDate: "last updated on 15/10/2026",
  },
  {
    id: "4d",
    title: "Differential Equations",
    content: "First order linear differential equations and Laplace transforms",
    subject: "Mathematics",
    createdDate: "created on 15/10/2026",
    updatedDate: "last updated on 15/10/2026",
  },
  {
    id: "5e",
    title: "English Communication Skills",
    content:
      "Technical writing grammar correction vocabulary and email etiquette",
    subject: "English",
    createdDate: "created on 15/10/2026",
    updatedDate: "last updated on 15/10/2026",
  },
];


app.get("/notes", (req, res) => {
  res.render("index.ejs", { notes });
});

app.get("/notes/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/notes", (req, res) => {
  let { title, content, subject, createdDate, updatedDate } = req.body;
  let newNote = { title, content, subject, createdDate, updatedDate };
  notes.push(newNote);
  res.redirect("/notes");
});

app.listen(port, () => {
  console.log("Listening to port: 8080");
});