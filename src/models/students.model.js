const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    }, 
    phone: String,
    password: String,
    fullName: String,
    image: {
        type: String,
        default: "https://res.cloudinary.com/file-upload/image/upload/v1695931627/30_l747he.png"
    },
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
    },
    otpcode: {
        type: String,
        default: null
    },
    referralCode: {
        type: String,
        unique: true
    },
    referred_code: {
        type: String,
        default: null
    },
    referredBonus: {
        type: Boolean,
        default: false
    },
    wallet: {
        type: Number,
        default: 0
    }
}, {timestamps: true});




module.exports = mongoose.model("Users", UserModel);