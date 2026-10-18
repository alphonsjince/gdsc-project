# Student Notes REST API

A fully functional, persistent REST API built for managing student academic notes. This application implements full CRUD operations, search functionality, and a clean, user interface.

## What the Project Does
This application serves as a digital notebook for students. It allows users to:
* Create notes with a Title, Content, and Subject.
* View all notes on a clean dashboard or view a single note in detail.
* Search notes by Title.
* Edit existing notes while tracking the exact modification dates automatically.
* Delete notes safely with an confirmation pop-up.

---

## Technologies Used
* **Backend Framework:** Node.js with Express.js
* **Templating Engine:** EJS (Embedded JavaScript templates)
* **Database / Storage:** Local JSON file storage (`notes.json`) utilizing Node's built-in `fs` (File System) module
* **HTTP method:** `method-override` npm package for handling PATCH and DELETE requests from standard HTML forms
* **Styling:** CSS (Color-coded for better user experience)

---

## Features Included
1. **Local Database:** Data is preserved completely on the hard drive using JSON and does not wipe out when the server restarts.
2. **Search Filtering:** Implements case-insensitive keyword searching using JavaScript `.filter()` and `.includes()`.
3. **Automated Timestamps:** Uses native `new Date().toLocaleDateString("en-GB")` to automatically format dates (`DD/MM/YYYY`) without forcing the user to type them.
4. **Data recieving and storing:** Uses HTML `required` attributes to prevent empty note creation, uses `value` fields to pre-populate edit inputs, and displays a friendly "No notes found" screen when a search yields zero results.

---

## How to Run It Locally

Follow these quick steps to launch the project on your machine:

1. **Clone or extract** the project folder and open your terminal inside the root directory (`students-api`).
2. **Install all required dependencies:**
   ```bash
   npm install
   ```
3. **Start the Express server:**
   ```bash
   node index.js
   ```
4. **Open your browser and navigate to:**
   `http://localhost:8080/notes`

---

## Challenges Faced & Solved

* **The Volatile Memory Problem:** Initially, variables were stored in the computer's temporary RAM array, causing all notes to vanish whenever the code file was modified or Nodemon restarted. 
  * *Solution:* Connected the backend routes directly to a `notes.json` file using `fs.readFileSync()` and `fs.writeFileSync()`, parsing the data strings into real arrays dynamically.
* **HTML Form Verb Limits:** Standard HTML forms natively support only `GET` and `POST` methods, making it initially impossible to send proper RESTful `PATCH` or `DELETE` requests.
  * *Solution:* Imported and configured the `method-override` middleware to hijack post requests using a query parameter string extension (`?_method=PATCH`).
* **Search feature showing no files when search doesnt match:** 


## What I Learned
1. **Database Interactions:** I mastered the standard full-stack cycle of data state management: Reading raw text data, parsing it into working objects (`JSON.parse`), executing mutations (`.push`, `.find`, `.filter`), and encoding it cleanly back onto the disk (`JSON.stringify`).
2. **How different files act and talk:** Learned how the backend handles live calculation logic (like dynamic ID and date generation) while the JSON file remains strictly plain data text.
3. **Better user friendly ddesign:** Understood that tiny additions like autofocusing a search bar, retaining search inputs on page reload, and handling empty query fallbacks turn a basic coding exercise into a usable application.
