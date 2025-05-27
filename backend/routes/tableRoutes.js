const express = require("express");
const router = express.Router();
const { addTable,getTables,deleteTable,updateTableStatus } = require("../controllers/tableController");

router.post("/", addTable);
router.get("/",getTables)
router.delete('/:id',deleteTable)
router.patch('/:id',updateTableStatus)

module.exports = router;