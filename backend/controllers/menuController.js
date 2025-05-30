const Menu = require("../models/Menu");

const addMenuItem = async (req, res) => {
  try {
    const { name, type,description, price, imageUrl, duration } = req.body;

    if (!name || !type || !price || !imageUrl || !duration) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newItem = new Menu({ name, type, description, price, imageUrl, duration });

    await newItem.save();

    res.status(201).json({ message: "New item is added!", newItem });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Menu item with this name already exists" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      if (!["Pizza", "Burger", "Drinks", "French Fries", "Veggies"].includes(category)) {
        return res.status(400).json({ message: "Invalid category filter" });
      }
    }

    const filter = {};
    if (category && category.trim() !== "") {
      filter.type = category;
    }

    const item = await Menu.find(filter);
    res.status(200).json({ message: "All menu items fetched.", item });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch menu items", error: error.message });
  }
};

const getMenuById= async(req,res)=>{
  try {
    const{id}=req.params

    const menuItem=await Menu.findById(id)

    if(!menuItem){
      return res.status(404).json({message:"Menu Item not found"})
    }

    return res.status(200).json({message:"Menu Item found", menuItem})
  } catch (error) {
    
  }
}

module.exports = { addMenuItem, getMenuItem,getMenuById };
