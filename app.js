const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const { User, NewRelease } = require("./server");
const chalk = require('chalk');
const { category, authors, paginatedBooks  } =
  require("./lists").default;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use ejs

app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware for static files

app.use(express.static("public"));


// function to filter books by category
const filteredBooksByCategory = async (query, genre) => {
  try {
    const books = await User.find(query);
    return books.filter((book) => book.genre === genre);
  } catch (e) {
    console.error(e);
  }
};

// middleware
app.get("/", async (req, res) => {
  try {
    const books = await paginatedBooks(User, req);
    const newBooks = await NewRelease.find();

    if (books && newBooks) {
      res.render("index", {
        layout: "layout/container",
        title: "Library",
        books: books.data,
        newBooks,
        authors,
        category,
        pagination: books.hasLoadPage,
        currentPage: books.page,
      });
    } else {
      res.status(404).render('noBooks' ,{
        layout: "layout/container",
        title: "Page Not Found",
        category,
        message : "Page Not Found"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// fiction books middleware
app.get("/fiction", async (req, res) => {
  const { query } = req.query;
  try {
    const filteredBooks = await filteredBooksByCategory(query, "Fiction");
    setTimeout(() => {
      res.render("category", {
        layout: "layout/container",
        title: "Fiction Books",
        filteredBooks,
        category,
      });
    }, 1500);
  } catch (e) {
    console.error(chalk.bgRedBright(e));
    res.send("Server Error").status(500);
  }
});

// phylosophy books middleware
app.get("/philosophy", async (req, res) => {
  const { query } = req.query;
  try {
    const filteredBooks = await filteredBooksByCategory(query, "Philosophy");
    setTimeout(() => {
      res.render("category", {
        layout: "layout/container",
        filteredBooks,
        title: "Philosophy Books",
        category,
      });
    }, 1500);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// biography books middleware
app.get("/biography", async (req, res) => {
  const { query } = req.query;
  try {
    const filteredBooks = await filteredBooksByCategory(query, "Biography");
    setTimeout(() => {
      res.render("category", {
        layout: "layout/container",
        filteredBooks,
        title: "Biography Books",
        category,
      });
    }, 1000);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

// self improvement middleware
app.get("/self-improvement", async (req, res) => {
  const { query } = req.query;
  try {
    const filteredBooks = await filteredBooksByCategory(
      query,
      "Self Improvement"
    );
    setTimeout(() => {
      res.render("category", {
        layout: "layout/container",
        filteredBooks,
        title: "Self Improvement Books",
        category,
      });
    }, 1500);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

app.get("/manga", async (req, res) => {
  const { query } = req.query;
  try {
    const filteredBooks = await filteredBooksByCategory(query, "Manga");
    setTimeout(() => {
      res.render("category", {
        layout: "layout/container",
        filteredBooks,
        title: "Manga Books",
        category,
      });
    }, 1500);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

app.get("/author/:id", async (req, res) => {
  const author = req.params.id;
  const { query } = req.query;
  try {
    const books = await User.find(query);
    const filteredBooks = books.filter((book) => book.author === author);
   if(filteredBooks.length === 0) {
    res.render('noBooks' , {
      layout: "layout/container",
      title: `Books by ${author}`,
      category,
      message : `Books by ${ author } can't be found`
    })
   }else {
    setTimeout(() => {
      res.render("category", {
        layout: "layout/container",
        filteredBooks,
        title: `Books by ${author}`,
        category,
      });
    }, 1000);
   }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

// search book middleware
app.get("/search", async (req, res) => {
  const search = req.query.q;
  try {
    const books = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { genre: { $regex: search, $options: "i" } },
      ],
    });
    if (books.length < 1) {
      res.render("noBooks", {
        layout: "layout/container",
        title: "Page Not Found",
        category,
        message : `No books found with specified name ${ search }`
      });
    } else {
      res.render("category", {
        layout: "layout/container",
        filteredBooks: books,
        title: `Search results for "${search}"`,
        category,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

// get detail books
app.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await User.findById(id);
    const filteredBook = await User.find();
    const filterdByAuthor = filteredBook.filter(item => item.author === book.author);
    if (!book) {
      return res.status(404).render('noBooks' , {
        layout: "layout/container",
        title: "Page Not Found",
        category,
        message : "There is no Detail"
      })
    }
    res.render("detail", {
      layout: "layout/container",
      title: book.name,
      book,
      category,
      otherBooks : filterdByAuthor      
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});
app.get("/new-books-detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await NewRelease.findById(id);
    const filteredBooks = await User.find();
    const filterdByAuthor = filteredBooks.filter(item => item.author === book.author);
    if (!book) {
      return res.status(404).render('noBooks' , {
        layout : "layout/container",
        title: "Page Not Found",
        category,
        message : "There is no Detail"
      });
    }
    res.render("new-detail", {
      layout: "layout/container",
      title: book.name,
      category,
      book,
      otherBooks : filterdByAuthor
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});

app.use("/", (req, res) => {
  res.render("layout/404", {
    layout: "layout/404-container",
    title: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(chalk.bgCyanBright(`Server is running on port http://localhost:${port}`));
});


