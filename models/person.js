const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Define the person schema
// A schema defines the structure of a document in a MongoDB collection
// It specifies the fields, their types, and any validation rules
// The first parameter is the name of the schema, and the second is an object defining the fields
// The fields can have various types such as String, Number, Date, etc.
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  work: {
    type: String,
    required: true,
    enum: ["student", "teacher", "engineer", "doctor"],
  },
  address: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
personSchema.pre("save", async function (next) {
const person =this;

// hash the password only if it has been modified (or is new)
if (!person.isModified("password")) return next();

try
{
  //generate a salt using bcrypt for hashing the password
  const salt = await bcrypt.genSalt(10);  

  // hash the plain text password using the generated salt
  const hashedPassword = await bcrypt.hash(person.password , salt)

  // override the plain password with the hashed one 
  person.password = hashedPassword;
  
}
catch (error) {
  console.error("Error hashing password:", error);
   return next(error); // Pass the error to the next middleware
}
// If no error occurred, proceed to the next middleware or save the document
next(); //to allow the save operation to proceed with the hashed password.
});

// Method to compare passwords
// This method will be used to compare the password provided by the user during login with the hashed password stored in the database
personSchema.methods.comparePassword = async function (candidatePassword) {
  
  try {
    // Compare the candidate password with the hashed password using bcrypt
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
} 




const Person = mongoose.model("Person", personSchema);
module.exports = Person;
