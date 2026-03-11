const express = require("express");
const router = express.Router();

const { getUserTransactions } = require("../controllers/transactionController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getUserTransactions);

module.exports = router;