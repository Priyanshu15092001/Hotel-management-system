const Order = require("../models/Order");
const Menu = require("../models/Menu");
const Table = require("../models/Table");
const { findOptimalTableCombination } = require("../utils/tableAllocator");
const {assignChefToOrder,removeOrderFromChef} = require("../utils/assignChefToOrder");

const placeOrder = async (req, res) => {
  try {
    const { customer, items, duration, totalPrice, diningType } = req.body;

    if (
      !customer.name ||
      !customer.phone ||
      !items ||
      !duration ||
      !totalPrice ||
      !diningType
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Address is required only for takeaway
    if (diningType === "Take Away" && !customer.address) {
      return res
        .status(400)
        .json({ message: "Address is required for Take Away orders" });
    } else if (diningType === "Dine in" && !customer.count) {
      return res.status(400).json({ message: "Total chair count is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No food is selected" });
    }

    // Validate all menu items exist
    for (const item of items) {
      if (!item.menuItem || !item.quantity) {
        return res
          .status(400)
          .json({ message: "User should select food item and quantity" });
      }

      const exists = await Menu.findById(item.menuItem);
      if (!exists) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuItem}` });
      }
    }

    if (diningType === "Dine in") {
      const availableTables = await Table.find({ status: "Available" });

      const sortedTables = availableTables.sort(
        (a, b) => b.occupancy - a.occupancy
      );

      const optimalCombo = findOptimalTableCombination(
        sortedTables,
        customer.count
      );

      if (!optimalCombo) {
        return res.status(400).json({ message: "Not enough available seats." });
      }

      var tableIds = optimalCombo.map((t) => t._id);

      var tableNo = optimalCombo.map((t) => t.tableId);
    }

    const deliveryTime=new Date(new Date().getTime() + duration * 60000)

    const newOrder = await Order.create({
      customer,
      items,
      tableBooked: diningType === "Dine in" ? tableNo : [],
      deliveryTime,
      totalPrice,
      diningType,
    });

    // const savedOrder = await newOrder.save();

    // const estimatedDuration = Math.ceil(
    //   (new Date(newOrder.deliveryTime) - new Date()) / (1000 * 60)
    // );

    // if (estimatedDuration < 1) estimatedDuration = 1;

    const assignedChefId = await assignChefToOrder(
      newOrder._id,
      duration
    );

    // console.log(assignedChefId);

    if (!assignedChefId) {
      return res.status(400).json({ message: "Failed to assign chef" });
    }
    // Update order
    newOrder.assignedChef = assignedChefId;
    await newOrder.save();

    if (diningType === "Dine in") {
      // Reserve the selected tables
      await Table.updateMany(
        { _id: { $in: tableIds } },
        { $set: { status: "Reserved" } }
      );
    }

    return res.status(201).json({ message: "Order Confirmed!", newOrder });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "All orders fetched", orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const { id } = req.params;
    let updatedOrder;
    const order = await Order.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status === "Processing") {
      order.status = status;
      updatedOrder = await order.save();
      await removeOrderFromChef(order._id);
      return res
        .status(200)
        .json({ message: "Order status changed", updatedOrder });
    } else {
      return res.status(400).json({ message: "Order is already complete" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus,
};
