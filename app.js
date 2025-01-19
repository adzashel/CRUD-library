const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const {User , NewRelease } = require('./server');

// use ejs

app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware for static files

app.use(express.static("public"));

// list
const category = [
  { list: "Fiction" },
  { list: "Phylosophy" },
  { list: "Biography" },
];

// middleware
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const newBooks = await NewRelease.find();
    console.log(newBooks);
    res.render("index", {
      layout: "layout/container",
      users,
      newBooks,
      title: "User List",
      category
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.listen(port, (req, res) => {
  console.log(`Server is running on port http://localhost:${port}`);
});
