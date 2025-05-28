const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentOrders: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      estimatedDuration: { type: Number, required: true } // in minutes
    }
  ],
  totalEstimatedTime: {
    type: Number,
    default: 0 // sum of all estimated durations
  }
});

module.exports = mongoose.model("Chef", chefSchema);
