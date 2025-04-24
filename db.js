const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/myapp"; // Replace with your MongoDB connection string


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