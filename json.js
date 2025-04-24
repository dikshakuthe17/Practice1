const { json } = require("express");

const jsonString = `{
  "name": "John Doe",   
    "age": 30,
    "city": "New York"}`;
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name); // Output: John Doe
console.log(jsonObject.age); // Output: 30
console.log(jsonObject.city); // Output: New York
console.log(jsonObject)