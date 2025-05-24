const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    instructions: {
      type: String,
      default: "",
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    diningType: {
      type: String,
      enum: ["Take Away", "Dine in"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Done", "Processing"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
