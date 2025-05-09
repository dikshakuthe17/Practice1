const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person.js");

// passport configuration for local strategy for authentication
// for checking username and password is valid or not
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // authentication logic here
    // username and password are passed as parameters to the strategy
    try {
      const user = await Person.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isPasswordValid =  await user.comparePassword(password) // Replace with bcrypt comparison if passwords are hashed
      if (!isPasswordValid) return done(null, false, { message: "Incorrect password." });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;