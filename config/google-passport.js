require("dotenv").config();

const User = require("../models/User");

const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CB
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        debugger;
        const user = await User.findOne({ googleID: profile.id });
        if (user) {
          debugger;
          done(null, user); // passes the profile data to serializeUser
        } else {
          debugger;
          const newUser = await User.create({
            name: profile.displayName,
            profileImg: profile.photos[0].value,
            googleID: profile.id
          });
          done(null, newUser);
        }
        debugger;
      } catch (err) {
        return done(err);
      }
    }
  )
);
module.exports = passport;
