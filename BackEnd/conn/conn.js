const mongoose = require('mongoose');


// MongoDB connection URI
// const mongoURI = 'mongodb://localhost:27017/bookstore'; // Replace with your MongoDB URI
require('dotenv').config();

// Connect to MongoDB
const conn=async()=>{
    try{
      await  mongoose.connect(`${process.env.URI}`)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
    }catch(err){
        console.log(err.message);
    }
}
conn();
