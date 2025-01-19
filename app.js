const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const { User, NewRelease  } = require("./server");

// use ejs

app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware for static files

app.use(express.static("public"));

// list
const category = [
  { list: "Fiction", link: "/fiction" },
  { list: "Phylosophy", link: "/phylosophy" },
  { list: "Biography", link: "/biography" },
];

// link

// middleware
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const newBooks = await NewRelease.find();
    res.render("index", {
      layout: "layout/container",
      users,
      newBooks,
      title: "User List",
      category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// fiction books middleware
app.get('/fiction' , async (req, res) => {
  try{
    const books = await User.findOne({
      "genre" : 'Fiction'
    });
    res.render('fiction' , {
      layout : "layout/container",
      books,
      title : "Fiction Books",
      category,
    }) 
  } catch(e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
