// sets up passport with a local strategy for authentication,using person model for user data

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./Models/person.js"); // Import the Person model

// Configure Passport.js with the local strategy
passport.use(
    new localStrategy(async (USERNAME, PASSWORD, done) => {
      try {
        console.log("Received credentials:", USERNAME, PASSWORD);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) return done(null, false, { message: "Incorrect username." });
  
        const isPasswordValid = user.password === PASSWORD? true : false; // Replace with your password hashing logic
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

  module.exports = passport; // Export the configured passport instance for use in other files