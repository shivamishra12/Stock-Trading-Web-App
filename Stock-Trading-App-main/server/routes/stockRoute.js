const express = require("express");
const router = express.Router();

const { getUserPortfolio } = require("../controllers/stockController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getUserPortfolio);

module.exports = router;