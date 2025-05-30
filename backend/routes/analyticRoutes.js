const { getOverallSummary,getOrderSummary,getRevenueGrowth} = require("../controllers/analyticController");
const express = require("express");

const router = express.Router();

router.get("/", getOverallSummary);
router.get("/order-summary",getOrderSummary)
router.get('/revenue-growth',getRevenueGrowth)

module.exports = router;