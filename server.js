const express = require("express");
require("./db.js"); // Import the db.js file to use the connection object
const app = express();

// const Person = require("./models/person.js"); // Import the person model
// const MenuItem = require("./models/menu.js"); // Import the menu model

const bodyParser = require("body-parser"); // Import body-parser middleware
app.use(bodyParser.json()); // Use body-parser to parse JSON request bodies

// Start the server immediately (db.js handles connection events)
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to my express app!");
});

app.get("/dosa", (req, res) => {
  res.send("sure sir, here is your dosa!");
});

app.get("/idli", (req, res) => {
  const menu_idli = {
    name: "rava idli",
    price: 50,
    size: "small",
    is_sambar: true,
    is_chutney: false,
  };
  res.send(menu_idli);
});

// POST method to send request
// app.post("/person", async (req, res) => {
//   try {
//     const personData = req.body; // Get the request body
//     const newPerson = new Person(personData); // Create a new Person instance
//     const savedPerson = await newPerson.save(); // Save the new person to the database
//     console.log("data saved");
//     res.status(200).json(savedPerson); // Respond with the saved person
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       return res.status(400).json({ error: err.message }); // Handle validation errors
//     }
//     res.status(500).json({ error: "Failed to save person" }); // Handle other errors
//   }
// });

// Get method to get the person data
// app.get("/person", async (req, res) => {
//   try {
//     const persons = await Person.find(); // Find all persons in the database
//     res.status(200).json(persons); // Respond with the list of persons
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch persons" }); // Handle errors
//   }
// });

// Get method to get the person data by id
// app.get("/person/:workType", async (req, res) => {
//   try {
//     const workType = req.params.workType; // Get the work type from the request parameters
//     if (
//       workType == "student" ||
//       workType == "teacher" ||
//       workType == "engineer" ||
//       workType == "doctor"
//     ) {
//       console.log("response fetched");
//       const persons = await Person.find({ work: workType }); // Find persons with the specified work type
//       res.status(200).json(persons); // Respond with the list of persons
//     } else {
//       res.status(400).json({ error: "Invalid work type" }); // Handle invalid work type
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch persons" }); // Handle errors
//   }
// });

// POST method to send request for menu items
// app.post("/menu", async (req, res) => {
//   try {
//     const menuData = req.body; // Get the request body
//     const newMenuItem = new MenuItem(menuData); // Create a new MenuItem instance
//     const savedMenuItem = await newMenuItem.save(); // Save the new menu item to the database
//     console.log("data saved");
//     res.status(200).json(savedMenuItem); // Respond with the saved menu item
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       return res.status(400).json({ error: err.message }); // Handle validation errors
//     }
//     res.status(500).json({ error: "Failed to save menu item" }); // Handle other errors
//   }
// });

// Get method to get the menu data
// app.get("/menu", async (req, res) => {
//   try {
//     const menuItems = await MenuItem.find(); // Find all menu items in the database
//     res.status(200).json(menuItems); // Respond with the list of menu items
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch menu items" }); // Handle errors
//   }
// });


// Import the person routes from personRoutes.js
const personRoutes = require("./Routes/personRoutes.js");

// Use the person routes 
app.use("/person", personRoutes);

// import the menu routes
const menuRoutes = require("./Routes/menuItemRoutes.js");

// Use the menu routes
app.use("/menu", menuRoutes);