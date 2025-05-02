const express = require("express");
require("./db.js"); // Import the db.js file to use the connection object
const app = express();
require("dotenv").config();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

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

// Configure Passport.js with the local strategy
passport.use(
  new localStrategy(async (USERNAME, PASSWORD, done) => {
    try {
      console.log("Received credentials:", USERNAME, PASSWORD);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isPasswordValid = user.password === PASSWORD;
      if (isPasswordValid) {
        console.log("User authenticated successfully:", user);
        return done(null, user); // User authenticated successfully
      } else {
        console.log("Invalid password for user:", USERNAME);
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (error) {
      return done(error); // Handle any errors that occur during authentication
    }
  })
);

// Middleware to initialize Passport.js
app.use(passport.initialize());

// Define routes
app.get("/", passport.authenticate('local',{session:false}), (req, res) => {
  res.send("Welcome to my express app!");
});

// Import the person routes from personRoutes.js
const personRoutes = require("./Routes/personRoutes.js");

// Use the person routes
app.use("/person", personRoutes);

// Import the menu routes
const menuRoutes = require("./Routes/menuItemRoutes.js");
const Person = require("./models/person.js");

// Use the menu routes
app.use("/menu", menuRoutes);
