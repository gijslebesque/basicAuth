const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  debugger;
  User.findById(req.user._id)
    .populate("posts") // here mongoose also queries the posts collection
    .then(user => {
      debugger;
      res.render("profile", { user: user });
    });
  //mongoose looks for user with id of session.user._id
  //populate is gonna look for all the posts that match id with whatever is in posts array
});

module.exports = router;
