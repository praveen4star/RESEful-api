const { Mongoose, mongo } = require("mongoose");

const mongoose = require('mongoose');
const articleSchema = {
    title : String,
    content : String
};
const Article = new mongoose.model('Article',articleSchema);
module.exports = Article ;
