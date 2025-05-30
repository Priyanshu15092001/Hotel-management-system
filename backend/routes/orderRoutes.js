const express = require("express");
const router = express.Router();
const { placeOrder,getOrders,updateOrderStatus } = require("../controllers/orderController");

router.post("/", placeOrder);
router.get("/",getOrders)
router.patch('/:id',updateOrderStatus)

module.exports = router;