const Stock = require("../models/stockSchema");

// 📊 Get logged-in user's portfolio
const getUserPortfolio = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user._id });

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserPortfolio
};