const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person.js");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isPasswordValid = user.comparePassword(password) // Replace with bcrypt comparison if passwords are hashed
      if (!isPasswordValid) return done(null, false, { message: "Incorrect password." });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);




module.exports = passport;