const { getOverallSummary} = require("../controllers/analyticController");
const express = require("express");

const router = express.Router();

router.get("/", getOverallSummary);

module.exports = router;