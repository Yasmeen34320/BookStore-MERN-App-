const mongoose = require('mongoose');

const book = new mongoose.Schema({

url:{
    type:String,
    required:true,
},
title:{
    type:String,
    required:true,
},
auther:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
language:{
    type:String,
    required:true,
},
desc:{
    type:String,
    required:true,
},

},{timestamps:true});
module.exports = mongoose.model('books', book);