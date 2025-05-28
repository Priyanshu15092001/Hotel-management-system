const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      count: {
        type: Number,
        validate: {
          validator: function (value) {
            // If diningType is 'Dine in', count must be >= 1
            if (this.diningType === "Dine in") {
              return value >= 1;
            }
            // For other types, no validation needed
            return true;
          },
          message: "Count must be at least 1 for Dine in orders",
        },
      },
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
    tableBooked: [Number],
    status: {
      type: String,
      enum: ["Done", "Processing", "Served", "Not Picked Up"],
      default: "Processing",
    },

    assignedChef: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
