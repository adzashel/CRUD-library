// connect mongodb
const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect('mongodb://localhost:27017/books_data' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(chalk.bgGreenBright('Connected to MongoDB'));
}).catch(err => console.error(err));

// create user schema
const userSchema = new mongoose.Schema({
    name: String,
    author: String,
    image : String,
    release_date : String,
    genre : String,
    description : String,
});

// new user schema
const newReleaseSchema = new mongoose.Schema({
    name : String,
    author: String,
    image : String,
    release_date : String,
    genre : String,
    description : String,
})

// create user model
const User = mongoose.model('books' , userSchema);
const NewRelease = mongoose.model('new_books' , newReleaseSchema);

// export user model

module.exports = {
    User,
    NewRelease,
 };
