// connect mongodb
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books_data' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error(err));

// create user schema
const userSchema = new mongoose.Schema({
    name: String,
    author: String,
    image : String,
});

// new user schema
const newReleaseSchema = new mongoose.Schema({
    name : String,
    author: String,
    image : String,
    release_date : Date,
    genre : String,
    description : String,
})

// create user model
const User = mongoose.model('books' , userSchema);
const NewRelease = mongoose.model('newRelease' , newReleaseSchema);

// export user model

module.exports = User;