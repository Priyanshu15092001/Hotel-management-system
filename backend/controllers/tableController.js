const Table = require("../models/Table");

const addTable = async (req, res) => {
  try {
    const { tableId, name, occupancy } = req.body;

    if (!tableId) {
      return res.status(400).json({ message: "Table Id is required!" });
    }

    const availTable = await Table.findOne({ tableId });

    if (availTable) {
      return res.status(400).json({ message: "Duplicate Table Id!" });
    }

    if (isNaN(occupancy) || occupancy < 2)
      return res.status(400).json({ message: "Min. 2 occupancy is required!" });

    const newTable = new Table({ tableId, name, occupancy });

    await newTable.save();

    return res.status(201).json({ message: "New table is added.", newTable });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    return res.status(200).json({ message: "All tables fetched.", tables });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    const deletedTableId = parseInt(table.tableId);

  
    await Table.deleteOne({ _id: id });

    // Reorder: Decrement tableId for all tables with tableId > deletedTableId
    await Table.updateMany(
      { tableId: { $gt: deletedTableId } },
      { $inc: { tableId: -1 } }
    );


    return res.status(200).json({ message: "Table deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTableStatus=async(req,res)=>{
  try {
    const {status} = req.query

    const {id} = req.params

    const table = await Table.findOne({tableId:id})

    if(!table){
      return res.status(404).json({message:"Table not found"})
    }

    table.status=status

    await table.save()

    return res.status(200).json({message:`Table ${id} is ${status} now`})


  } catch (error) {
    console.error(error);
    return res.status(500).json({message:'Internal server error'})
  }
}

module.exports = { addTable, getTables, deleteTable, updateTableStatus };
