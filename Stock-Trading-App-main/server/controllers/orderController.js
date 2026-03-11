const Order = require("../models/orderSchema");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Stock = require("../models/stockSchema");

// 🟢 Create Order (Buy / Sell)
const createOrder = async (req, res) => {
  try {
    const { symbol, name, price, count, stockType, orderType } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalPrice = price * count;

    // 🔴 BUY LOGIC
    if (orderType === "buy") {
      if (user.balance < totalPrice) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      user.balance -= totalPrice;
      await user.save();

      // Update portfolio
      const existingStock = await Stock.findOne({
        user: user._id,
        symbol
      });

      if (existingStock) {
        existingStock.count += count;
        existingStock.totalPrice += totalPrice;
        await existingStock.save();
      } else {
        await Stock.create({
          user: user._id,
          symbol,
          name,
          price,
          count,
          totalPrice
        });
      }
    }

    // 🔵 SELL LOGIC
    if (orderType === "sell") {
      const existingStock = await Stock.findOne({
        user: user._id,
        symbol
      });

      if (!existingStock || existingStock.count < count) {
        return res.status(400).json({ message: "Not enough stocks to sell" });
      }

      existingStock.count -= count;
      existingStock.totalPrice -= price * count;
      await existingStock.save();

      user.balance += totalPrice;
      await user.save();
    }

    // 📝 Create Order Record
    const order = await Order.create({
      user: user._id,
      symbol,
      name,
      price,
      count,
      totalPrice,
      stockType,
      orderType,
      orderStatus: "completed"
    });

    // 💰 Create Transaction Record
    await Transaction.create({
      user: user._id,
      type: orderType,
      paymentMode: "wallet",
      amount: totalPrice,
      time: new Date().toISOString()
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders
};