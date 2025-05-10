const express = require("express");
const router = express.Router();
const Person = require("../models/person.js"); // Import the person model

// Middleware to parse JSON request bodies
router.use(express.json());

// post route to add person data
router.post("/signup", async (req, res) => {
  try {
    const personData = req.body; // Get the request body
    const newPerson = new Person(personData); // Create a new Person instance
    const savedPerson = await newPerson.save(); // Save the new person to the database
    console.log("data saved");
    res.status(200).json(savedPerson); // Respond with the saved person
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message }); // Handle validation errors
    }
    res.status(500).json({ error: "Failed to save person" }); // Handle other errors
  }
});

// Get method to get the person data
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find(); // Find all persons in the database
    res.status(200).json(persons); // Respond with the list of persons
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch persons" }); // Handle errors
  }
});

// Get method to get the person data by id
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Get the work type from the request parameters
    if (
      workType == "student" ||
      workType == "teacher" ||
      workType == "engineer" ||
      workType == "doctor"
    ) {
      console.log("response fetched");
      const persons = await Person.find({ work: workType }); // Find persons with the specified work type
      res.status(200).json(persons); // Respond with the list of persons
    } else {
      res.status(400).json({ error: "Invalid work type" }); // Handle invalid work type
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch persons" }); // Handle errors
  }
});


// Put method to update person data by id
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Get the person ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body
    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatedData,
      { new: true } // Return the updated document
    ); // Update the person in the database
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" }); // Handle person not found
    }
    console.log("data updated");
    res.status(200).json(updatedPerson); // Respond with the updated person
  } catch (err) {
    res.status(500).json({ error: "Failed to update person" }); // Handle errors
  }
});


// Delete method to delete person data by id
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Get the person ID from the request parameters
    const deletedPerson = await Person.findByIdAndDelete(personId); // Delete the person from the database
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" }); // Handle person not found
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person deleted successfully" }); // Respond with success message
  } catch (err) {
    res.status(500).json({ error: "Failed to delete person" }); // Handle errors
  }
});

module.exports = router;
