const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postImage: {
        type: String,
        default: ''
    },
    postText: {
        type: String,
        default: ''
    }
}, {timestamps: true});


module.exports = mongoose.model('Post', PostSchema);
