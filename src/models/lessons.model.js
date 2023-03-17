const mongoose = require('mongoose');

const Lessons = new mongoose.Schema({
    videoLink: {
        type: String,
        required: true
    },
    videoTitle: {
        type: String,
        required: true
    }
}, {timestamps: true});



module.exports = mongoose.model('Lessons', Lessons);