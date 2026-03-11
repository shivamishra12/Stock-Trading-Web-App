const mongoose = require("mongoose");

const stocksSchema = new mongoose.Schema({
    user:{type: String},
    symbol: {type: String},
    name: {type: String},
    price: {type: Number},
    count: {type: Number},
    totalPrice: {type: Number},
    stockExchange: {type: String}
})

module.exports = mongoose.model("stocks", stocksSchema);