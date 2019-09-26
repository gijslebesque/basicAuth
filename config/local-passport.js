const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    // by default local strategy will look for a username field
    // this app uses name instead of username so we have to pass an option object
    {
      usernameField: "name"
    },
    //takes in a callback function with three arguments
    // the users username, password,
    // and a callback functions by concention called done (similar to express next)
    // the done cb takes in three arguments, an error, an authorised user and an optional message
    async (name, password, done) => {
      debugger;
      try {
        const user = await User.findOne({ name });
        if (!user) {
          return done(null, false, { message: "No user with that name" });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
          return done(null, false, { message: "Incorrect password" });
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
// };

module.exports = passport;
