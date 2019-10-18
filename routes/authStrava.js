const router = require("express").Router();
const passport = require("passport");

router.get("/auth/strava", passport.authenticate("strava"));

router.get(
  "/auth/strava/callback",
  passport.authenticate("strava", { failureRedirect: "/" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

module.exports = router;
