const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const User = require("./server");
const port = 8080;

// use ejs

app.set("view engine", "ejs");
app.use(expressLayouts);

// middleware for static files

app.use(express.static("public"));

// middleware
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { 
        layout : "layout/container", 
        users: users,
        title: "User List"
     });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port http://localhost:${port}`);
});
