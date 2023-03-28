const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    email: String, 
    phone: String,
    password: String,
    payment: {
        type: Boolean, 
        default: false
    },
    paymentType:  {
        type: String,
        enum: ['Payme', 'Menejer', 'Crypto'],
        default: "To'lanmagan"
    },
}, {timestamps: true});




module.exports = mongoose.model("Users", UserModel);