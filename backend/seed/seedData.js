const axios = require("axios");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const connectDB = require("../config/db");

const seedDatabase = async () => {
  await connectDB();
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);
    console.log("Database seeded!");
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

seedDatabase();
