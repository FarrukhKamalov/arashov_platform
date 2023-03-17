const mongoose = require("mongoose");


const BlogModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required:true
    } 
}, {timestamps: true})

module.exports = mongoose.model("Blogs", BlogModel);
