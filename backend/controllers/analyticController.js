const Order = require("../models/Order");

const getOverallSummary = async (req, res) => {
  try {
    const summary = {};
    const orders = await Order.find();

    const totalOrders = orders.length;

    summary.totalOrders = totalOrders;

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    summary.totalRevenue = totalRevenue;

    const customerPhones = new Set(orders.map((order) => order.customer.phone));
    const totalCustomers = customerPhones.size;

    summary.totalCustomers = totalCustomers;

    return res.status(200).json({
      message: "Order Summary Fetched",
      summary,
    });
  } catch (error) {
    console.error("Analytics error:", error.message);
    return res.status(500).json({ message: "Failed to load analytics" });
  }
};

const getOrderSummary = async (req, res) => {
  try {
    const { range } = req.query;
    const orderSummary = {};
    const now = new Date();
    let startDate;

    // Determine date range
    switch (range) {
      case "daily":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "weekly":
        const firstDayOfWeek = now.getDate() - now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
        break;
      case "yearly":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid range. Use daily, weekly, or yearly." });
    }

    // Common date filter
    const dateFilter = { createdAt: { $gte: startDate, $lte: now } };

    const dineInCount = await Order.countDocuments({
      ...dateFilter,
      diningType: "Dine in",
    });

    orderSummary.dineInCount = dineInCount;

    const takeAwayCount = await Order.countDocuments({
      ...dateFilter,
      diningType: "Take Away",
    });

    orderSummary.takeAwayCount = takeAwayCount;

    const servedCount = await Order.countDocuments({
      ...dateFilter,
      status: "Served",
    });

    orderSummary.servedCount = servedCount;

    return res.status(200).json({
      message: "Order summary fetched",
      orderSummary
    });
  } catch (error) {
    console.error("Order summary error:", error.message);
    return res.status(500).json({ message: "Failed to load order summary" });
  }
};

const getRevenueGrowth = async(req,res)=>{
  try {
    const { range } = req.query;

    if (!["daily", "weekly", "yearly"].includes(range)) {
      return res.status(400).json({ message: "Invalid range" });
    }

    const now = new Date();
    const matchStage = {}; 

    let groupStage, projectStage;

    if (range === "daily") {
      // Group by day (YYYY-MM-DD)
      groupStage = {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
      };
      projectStage = {
        label: "$_id", // already a readable date
        totalRevenue: 1,
      };
    } else if (range === "weekly") {
      // Group by ISO week number and year
      groupStage = {
        year: { $isoWeekYear: "$createdAt" },
        week: { $isoWeek: "$createdAt" },
      };
      projectStage = {
        label: {
          $concat: [
            "Week ",
            { $toString: "$_id.week" },
            " (",
            { $toString: "$_id.year" },
            ")",
          ],
        },
        totalRevenue: 1,
      };
    } else if (range === "yearly") {
      groupStage = { $year: "$createdAt" };
      projectStage = {
        label: { $toString: "$_id" },
        totalRevenue: 1,
      };
    }

    const revenue = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: groupStage,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $project: projectStage,
      },
      {
        $sort: { label: 1 },
      },
    ]);

    return res.status(200).json({
      message:"Revenue growth fetched",
      range,
      revenue,
    });
  } catch (error) {
    console.error("Revenue growth error:", error.message);
    return res
      .status(500)
      .json({ message: "Failed to load revenue growth" });
  }
}

module.exports = { getOverallSummary,getOrderSummary,getRevenueGrowth };
