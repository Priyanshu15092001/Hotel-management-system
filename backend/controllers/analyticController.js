const Order = require("../models/Order");

const getOverallSummary = async (req, res) => {
  try {

    const summary={}
    const orders = await Order.find();

    const totalOrders = orders.length;

    summary.totalOrders=totalOrders

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    summary.totalRevenue=totalRevenue

    const customerPhones = new Set(orders.map(order => order.customer.phone));
    const totalCustomers = customerPhones.size;

    summary.totalCustomers=totalCustomers

    return res.status(200).json({
     message:'Order Summary Fetched',
     summary
    });
  } catch (error) {
    console.error("Analytics error:", error.message);
    return res.status(500).json({ message: "Failed to load analytics" });
  }
};

module.exports = { getOverallSummary };
