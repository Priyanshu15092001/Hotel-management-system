const { addChef, getAllChefs } = require("../controllers/chefController");
const express = require("express");

const router = express.Router();

router.post("/", addChef);
router.get("/", getAllChefs);

module.exports = router;
