const express = require("express");
require("./db.js"); // Import the db.js file to use the connection object
const app = express();
require("dotenv").config();
const passport = require("./auth.js"); // Import the passport configuration

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Middleware to parse JSON request bodies
// variable for port number
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware function
const logger = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};
// For all routes
app.use(logger);

// Middleware to initialize Passport.js
app.use(passport.initialize());

// Define routes
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to my express app!");
});

// Import the person routes from personRoutes.js
const personRoutes = require("./Routes/personRoutes.js");

// Use the person routes
app.use("/person", personRoutes);

// Import the menu routes
const menuRoutes = require("./Routes/menuItemRoutes.js");

// Use the menu routes
app.use("/menu", localAuthMiddleware, menuRoutes);
