const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");

router.get("/", (req, res) => {
  axios
    .get(
      `https://www.strava.com/api/v3/athelete/activities/
      `,

      {
        headers: {
          Authorization: `Bearer ${process.env.STRAVA_ACCESS_TOKEN}`,
          scope: "activity:read_permission"
        },
        query: {
          scope: "activity:read_permission"
        }
      }
    )
    .then(result => {
      debugger;
    })
    .catch(err => {
      debugger;
    });
  User.findById(req.user._id)
    .populate("posts") // here mongoose also queries the posts collection
    .then(user => {
      res.render("profile", { user: user });
    });
  //mongoose looks for user with id of session.user._id
  //populate is gonna look for all the posts that match id with whatever is in posts array
});

module.exports = router;

// require("dotenv").config();
// strava.config({
//   access_token: process.env.STRAVA_ACCESS_TOKEN,
//   client_id: process.env.STRAVA_CLIENT_ID,
//   client_secret: process.env.STRAVA_CLIENT_SECRET,
//   redirect_uri: process.env.STRAVA_CB,
//   activity: "read_permission"
// });

// router.get("/", (req, res) => {
//   strava.athlete.get(
//     {
//       // id: req.user.stravaID,
//       access_token: process.env.STRAVA_ACCESS_TOKEN,
//       scope: "activity:read_permission"
//     },
//     function(err, payload, limits) {
//       if (!err) {
//         debugger;
//         console.log(payload);
//       } else {
//         debugger;
//         console.log(err);
//       }
//     }
//   );
