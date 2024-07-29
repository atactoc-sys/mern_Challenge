const Transaction = require("../models/Transaction");

const getAllTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`2023-${month}-01`),
      $lt: new Date(`2023-${month}-31`),
    },
  };
  if (search) {
    query.$text = { $search: search };
  }
  const transactions = await Transaction.find(query, {
    score: { $meta: "textScore" },
  })
    .sort({ score: { $meta: "textScore" } })
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));
  res.json(transactions);
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`2023-${month}-01`),
      $lt: new Date(`2023-${month}-31`),
    },
  };
  const [totalSaleAmount, totalSoldItems] = await Promise.all([
    Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, totalSaleAmount: { $sum: "$price" } } },
    ]),
    Transaction.countDocuments({ ...query, sold: true }),
  ]);
  const totalNotSoldItems = await Transaction.countDocuments({
    ...query,
    sold: { $ne: true },
  });
  res.json({
    totalSaleAmount: totalSaleAmount[0]?.totalSaleAmount || 0,
    totalSoldItems,
    totalNotSoldItems,
  });
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`2023-${month}-01`),
      $lt: new Date(`2023-${month}-31`),
    },
  };
  const transactions = await Transaction.find(query);
  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901+": 0,
  };
  transactions.forEach((transaction) => {
    const price = transaction.price;
    if (price <= 100) priceRanges["0-100"]++;
    else if (price <= 200) priceRanges["101-200"]++;
    else if (price <= 300) priceRanges["201-300"]++;
    else if (price <= 400) priceRanges["301-400"]++;
    else if (price <= 500) priceRanges["401-500"]++;
    else if (price <= 600) priceRanges["501-600"]++;
    else if (price <= 700) priceRanges["601-700"]++;
    else if (price <= 800) priceRanges["701-800"]++;
    else if (price <= 900) priceRanges["801-900"]++;
    else priceRanges["901+"]++;
  });
  res.json(priceRanges);
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  const query = {
    dateOfSale: {
      $gte: new Date(`2023-${month}-01`),
      $lt: new Date(`2023-${month}-31`),
    },
  };
  const categoryCounts = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { _id: 0, category: "$_id", count: 1 } },
  ]);
  res.json(
    Object.fromEntries(
      categoryCounts.map(({ category, count }) => [category, count])
    )
  );
};

const getCombinedData = async (req, res) => {
  const query = {
    dateOfSale: {
      $gte: new Date(`2023-${req.query.month}-01`),
      $lt: new Date(`2023-${req.query.month}-31`),
    },
  };
  const [transactions, statistics, barChart, pieChart] = await Promise.all([
    Transaction.find(query),
    Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, totalSaleAmount: { $sum: "$price" } } },
    ]),
    Transaction.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]),
    Transaction.aggregate([
      { $match: query },
      { $group: { _id: "$priceRange", count: { $sum: 1 } } },
      { $project: { _id: 0, priceRange: "$_id", count: 1 } },
      { $sort: { priceRange: 1 } },
    ]),
  ]);
  res.json({
    transactions,
    statistics: statistics[0],
    barChart: Object.fromEntries(
      barChart.map(({ priceRange, count }) => [priceRange, count])
    ),
    pieChart: Object.fromEntries(
      pieChart.map(({ category, count }) => [category, count])
    ),
  });
};

module.exports = {
  getAllTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
