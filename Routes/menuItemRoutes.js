const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu.js");// Import the menu model

// POST method to send request for menu items
router.post("/", async (req, res) => {
  try {
    const menuData = req.body; // Get the request body
    const newMenuItem = new MenuItem(menuData); // Create a new MenuItem instance
    const savedMenuItem = await newMenuItem.save(); // Save the new menu item to the database
    console.log("data saved");
    res.status(200).json(savedMenuItem); // Respond with the saved menu item
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message }); // Handle validation errors
    }
    res.status(500).json({ error: "Failed to save menu item" }); // Handle other errors
  }
});

// Get method to get the menu data
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); // Find all menu items in the database
    res.status(200).json(menuItems); // Respond with the list of menu items
    console.log("data fetched");
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu items" }); // Handle errors
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Get the work type from the request parameters
    if (
      tasteType == "sour" ||
      tasteType == "bitter" ||
      tasteType == "sweet" ||
      tastetype == "spicy"
    ) {
      console.log("response fetched");
      const menuItems = await MenuItem.find({ taste: tasteType }); // Find persons with the specified taste type
      res.status(200).json(menuItems); // Respond with the list of persons
    } else {
      res.status(400).json({ error: "Invalid taste type" }); // Handle invalid taste type
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu" }); // Handle errors
  }
});


// put method to update menu item data by id
router.put("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id; // Get the menu item ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedData,
      { new: true } // Return the updated document
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" }); // Handle menu item not found
    }
    console.log("data updated");
    res.status(200).json(updatedMenuItem); // Respond with the updated menu item
  } catch (err) {
    res.status(500).json({ error: "Failed to update menu item" }); // Handle errors
  }
});

// Delete method to delete menu item data by id
router.delete("/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id; // Get the menu item ID from the request parameters
    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemId); // Delete the menu item from the database
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" }); // Handle menu item not found
    }
    res.status(200).json({ message: "Menu item deleted successfully" }); // Respond with success message
  } catch (err) {
    res.status(500).json({ error: "Failed to delete menu item" }); // Handle errors
  }
});

module.exports = router; // Export the router so it can be used in other files
