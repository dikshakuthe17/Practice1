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

// Create the person model using the schema
// Model is a construct to create and manage documents in a collection
// The first parameter is the name of the model, and the second is the schema
// The model name is usually singular and capitalized, while the collection name is pluralized
// The model provides methods for CRUD operations (Create, Read, Update, Delete) on the collection

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
