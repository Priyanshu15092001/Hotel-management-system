const Chef = require("../models/Chef");

const addChef = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newChef = new Chef({ name });

    await newChef.save();

    return res.status(201).json({ message: "New chef is added",newChef });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    return res.status(200).json({ message: "Chef details fetched", chefs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addChef, getAllChefs };
