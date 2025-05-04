const express = require("express");
const mongoose = require("mongoose");

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
  // hash the password generation using bcrypt
  const salt = await bcrypt.genSalt(10);  

  // hash passord
  const hashedPassword = await bcrypt.hashedPassword(person.password , salt)

  // override the plain password with the hashed one 
  person.password = hashedPassword;
  
}
catch (error) {
  console.error("Error hashing password:", error);
   return next(error); // Pass the error to the next middleware
}
});



const Person = mongoose.model("Person", personSchema);
module.exports = Person;
