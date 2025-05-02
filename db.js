const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

// Define the MongoDB connection URL in local storage or our storage
// const mongoURL = "mongodb://localhost:27017/myapp"; // Replace with your MongoDB connection string
//mongodb connection on mongoDB Atlas
// const mongoURL = "mongodb+srv://piyushkasture120:piyush1717@cluster0.xabeqs8.mongodb.net/"; // Replace with your MongoDB Atlas connection string

// shortcut for dotenv
// const mongoURL = process.env.MONGO_URL_LOCAL; // Use the environment variable for MongoDB connection string

// shortcut for dotenv
const mongoURL = process.env.MONGO_URL_ATLAS; // Use the environment variable for MongoDB Atlas connection string

// Connect to the MongoDB database using mongoose
 mongoose.connect(mongoURL);
// Get the default connection object
const db = mongoose.connection;


// Define event listeners for the connection object
db.on("connected", () => {
  console.log("MongoDB connected successfully!");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected. ");
});

// Handle process termination signals to close the connection gracefully

// Export the connection object so it can be used in other files
module.exports = db;
