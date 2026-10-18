const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
const jsonFilePath = path.join(__dirname, "notes.json");


const port = process.env.PORT || 8080;


app.get("/notes", (req, res) => {
  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  let { search } = req.query;
  if (search) {
    notes = notes.filter((note) => {
      return (
        note.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  res.render("index.ejs", { notes, search });
});

app.get("/notes/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/notes", (req, res) => {
  let { title, content, subject} = req.body;
  let id = uuidv4();
  let createdDate = new Date().toLocaleDateString("en-GB"); 
  let updatedDate = new Date().toLocaleDateString("en-GB"); 
  let newNote = { id, title, content, subject, createdDate, updatedDate};

  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  notes.push(newNote);
  fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2), "utf-8");

  res.redirect("/notes");
});

app.get("/notes/:id", (req, res) => {
  let { id } = req.params;
  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  let note = notes.find((n) => id === n.id);
  res.render("show.ejs", { note });
});

app.patch("/notes/:id", (req, res) => {
  let { id } = req.params;
  let { title, content, subject } = req.body;
  let updatedDate = new Date().toLocaleDateString("en-GB");

  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

  let note = notes.find((n) => id === n.id);

  note.title = title;
  note.content = content;
  note.subject = subject;
  note.updatedDate = updatedDate;

  fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2), "utf-8");

  res.redirect("/notes");
});

app.get("/notes/:id/edit", (req, res) => {
  let { id } = req.params;

  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  let note = notes.find((n) => id === n.id);

  res.render("edit.ejs", { note });
});

app.delete("/notes/:id", (req, res) => {
  let { id } = req.params;

  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  notes = notes.filter((n) => n.id !== id);
  fs.writeFileSync(jsonFilePath, JSON.stringify(notes, null, 2), "utf-8");

  res.redirect("/notes");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
