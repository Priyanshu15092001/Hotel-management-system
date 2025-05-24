
const Order= require('../models/Order')
const Menu= require('../models/Menu')

const placeOrder = async (req, res) => {
  try {
    const { phone, address, items, deliveryTime, totalPrice, diningType } =
      req.body;

    if (!phone || !items || !deliveryTime || !totalPrice || !diningType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Address is required only for takeaway
    if (diningType === "Take Away" && !address) {
      return res
        .status(400)
        .json({ message: "Address is required for Take Away orders" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items must be a non-empty array" });
    }

    // Validate all menu items exist
    for (const item of items) {
      if (!item.menuItem || !item.quantity) {
        return res
          .status(400)
          .json({ message: "Each item must include a menuItem and quantity" });
      }

      const exists = await Menu.findById(item.menuItem);
      if (!exists) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuItem}` });
      }
    }

    const newOrder = new Order({
      phone,
      address: diningType === "Take Away" ? address : undefined,
      items,
      deliveryTime,
      totalPrice,
      diningType,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({message:"Order Confirmed!",savedOrder});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
};

module.exports = {
  placeOrder,
};
