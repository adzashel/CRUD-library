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
  { list: "Phylosophy", link: "/philosophy" },
  { list: "Biography", link: "/biography" },
];

// author
const authors = [{
  author: "Friedrich Nietzsche",
  link: "nietzsche",
},{
  author: "Immanuel Kant",
  link: "kant",
},
{
  author: "Albert Camus",
  link: "camus",
},{
  author: "Beby Chaesara",
  link: "beby",
}, {
  author: "F.Scoot Fitzgerald",
  link: "fitzgerald",
}, {
  author: "Eiichiro Oda",
  link: "oda",
}
 
]

// middleware
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    const newBooks = await NewRelease.find();
    res.render("index", {
      layout: "layout/container",
      users,
      newBooks,
      title: "Book Library",
      category,
      authors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// fiction books middleware
app.get('/fiction' , async (req, res) => {
  const {query} = req.query;
  try {
    const books = await User.find(query);
    const filteredBooks = books.filter(books => books.genre === "Fiction");
    setTimeout(() => {
      res.render('category', {
        layout : "layout/container",
        filteredBooks,
        title: "Fiction Books",
        category,
    });
    } ,1500)
  }catch(e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

// phylosophy books middleware
app.get('/philosophy', async (req, res) => {
  const { query } = req.query;
  try {
    const books = await User.find(query);
    const filteredBooks = books.filter(books => books.genre === "Philosophy");
    setTimeout(() => {
      res.render('category' , {
        layout : "layout/container",
        filteredBooks,
        title: "Philosophy Books",
        category,
      })
    }, 1500)
  }catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// biography books middleware
app.get('/biography' , async (req, res) => {
  const { query } = req.query;
  try {
    const books = await User.find( query );
    const filteredBooks = books.filter(books => books.genre === "Biography");
    setTimeout(() => {
      res.render('category' , {
        layout : "layout/container",
        filteredBooks,
        title: "Biography Books",
        category,
      })
    })
  }catch(e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
})


app.use('/' , (req, res) => {
  res.render('layout/404' , {
    layout: "layout/404-container",
    title: "Page Not Found",
  }).status(404);
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
