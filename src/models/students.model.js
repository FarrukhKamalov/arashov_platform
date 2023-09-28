const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    email: String, 
    phone: String,
    password: String,
    fullName: String,
    payment: {
        type: Boolean, 
        default: false
    },
    paymentType:  {
        type: String,
        enum: ['Payme', 'Menejer', 'Crypto', "To`lanmagan"],
        default: "To`lanmagan",
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});




module.exports = mongoose.model("Users", UserModel);