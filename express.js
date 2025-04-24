// // core modules

// var fs = require("fs");
// var os = require("os");

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile("greeting.txt", "Hello " + user.username + "!\n", () => {
//   console.log("Saved!");
// });

var notes = require("./notes.js");
var _ = require("lodash");

var name = notes.name;
console.log(name);

var data = ["Diksha", "Ankita", "2",  "Aditi", "Anjali", "Aditi", "Anjali"];
var uniqueNames = _.uniq(data);
console.log(uniqueNames);