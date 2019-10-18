const express = require("express");
const router = express.Router();
const passport = require("passport");

//passport strategy will redirect us to google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"] // Used to specify the required data
  })
);

//google redirects us here. we validate user first and then redirect to profile
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/profile");
  }
);

module.exports = router;
