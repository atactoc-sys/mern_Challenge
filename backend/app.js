require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactions");
const cors = require("cors");

const app = express();
app.use(cors());
// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
