const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description:{type:String},
  type: {
    type: String,
    required: true,
    enum: ["Pizza", "Burger", "Drinks", "Veggies", "French Fries"],
  },
  imageUrl:{type:String, required:true},
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
