const mongoose = require("mongoose");


const requestSchema = new mongoose.Schema({
    paymentType:  {
        type: String,
        enum: ['Humo/Uzcard', 'USDT (TRC20)', 'Binance Pay (USDT)', 'Menejer'],
    },
    name: String,
    telephone: String
}, {timestamps: true});



module.exports = mongoose.model("Request",  requestSchema);
