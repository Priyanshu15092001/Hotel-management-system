const Table = require("../models/Table");

const addTable = async (req, res) => {
  try {
    const { name,occupancy } = req.body;
    if (isNaN(occupancy) || occupancy < 2)
      return res.status(400).json({ message: "Min. 2 occupancy is required!" });

    const newTable = new Table({ name,occupancy });

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

const deleteTable = async(req,res)=>{
    try {
        const{id}=req.params
        
        const table= await Table.findById(id)
        if(!table){
            return res.status(404).json({message:"Table not found"})
        }
        await Table.findByIdAndDelete(id)
        return res.status(200).json({message:"Table deleted successfully."})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { addTable,getTables,deleteTable };
