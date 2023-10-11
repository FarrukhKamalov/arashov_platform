const mongoose = require("mongoose");


const withdrawSchema = new mongoose.Schema({
    name: String,
    telephone: String,
    summa: String,
    withdrawType: {
        type: String,
        enum: ['Humo', 'Uzcard', 'USDT (TRC20)', 'Binance Pay (USDT)']
    },
    cardNumber: {
        type: String
    }
});

module.exports = mongoose.model("withdraw", withdrawSchema);