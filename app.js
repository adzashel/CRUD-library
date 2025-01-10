const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');

const port = 8080;

// use ejs

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

// middleware for static files

app.use(express.static('public'));

// connect mongodb
mongoose.connect('mongodb://localhost:27017/login' , {
    userNewUrlParser :true,
    useUnifiedToplogy :true
}).then(() => {
    console.log('Connected to mongodb');
}).catch(err => console.error(err));

// create user model
const data  = mongoose.model('users_login');

// middleware 
app.get('/' , (req, res) => {
    res.send('Hello World');
});



app.listen(port , (req, res) =>{
    console.log(`Server is running on port http://localhost:${port}`);
});