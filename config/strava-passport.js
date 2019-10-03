require("dotenv").config();

const User = require("../models/User");

const StravaStrategy = require("passport-strava-oauth2").Strategy;
const passport = require("passport");
module.exports = passport.use(
  new StravaStrategy(
    {
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: process.env.STRAVA_CB
    },
    async (accessToken, refreshToken, profile, done) => {
      // asynchronous verification, for effect...
      debugger;

      try {
        const user = await User.findOne({ stravaID: profile.id });
        if (user) {
          debugger;
          done(null, user); // passes the profile data to serializeUser
        } else {
          debugger;
          const newUser = await User.create({
            name: profile.displayName,
            profileImg: profile.photos[0].value,
            stravaID: profile.id
          });
          return done(null, newUser);
        }
        debugger;
      } catch (err) {
        return done(err);
      }
    }
  )
);
