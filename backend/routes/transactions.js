const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
} = require("../controllers/transactionController");

router.get("/transactions", getAllTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChart);
router.get("/piechart", getPieChart);
router.get("/combined", getCombinedData);

module.exports = router;
