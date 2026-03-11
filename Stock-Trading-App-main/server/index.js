const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Stock Trading API Running...");
});

const orderRoutes = require("./routes/orderRoute");
const userRoutes = require("./routes/userRoute");
const stockRoutes = require("./routes/stockRoute");
const transactionRoutes = require("./routes/transactionRoute");

app.use("/api/transactions", transactionRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});