const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableId:{type:Number,required:true},
  name:{type:String},
  occupancy: { type: Number, required: true, min: 2 },
  status: { type: String, enum:["Reserved","Available"],default:"Available" },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
