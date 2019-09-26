// import both models
// create post route
// store post in db (get user id from session)
// then update user.
// then redirect back to /profile

// do not forget to add the route to app.js

/*

Post.create({
    title,
    content,
    author: from session
}) 

*/

const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

router.post("/", (req, res) => {
  const { title, content } = req.body;
  const id = req.session.user._id;

  Post.create({
    title: title,
    content: content,
    author: id
  })
    .then(post => {
      // here update user
      // find user with session.user._id
      // store post._id inside user model
      // {$push:  }

      return User.findByIdAndUpdate(
        id,
        { $push: { posts: post._id } },
        { new: true }
      );
    })
    .then(updatedUser => {
      debugger;
      res.redirect("/profile");
    });
});

router.get("/", (req, res) => {
  Post.find()
    .populate("author")
    .then(posts => {
      debugger;
      res.render("posts", { posts });
    });
});
// create get request to get all posts
// populate the author of post
// show post and name author in hbs

// don't forget to make a hbs file

module.exports = router;
