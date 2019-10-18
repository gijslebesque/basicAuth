const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

router.post("/", (req, res) => {
  // when we create a post we need to populate three fields.
  // we receive title and content from a form.
  const { title, content } = req.body;
  const id = req.user._id;

  // the user id (which we need to establish as relation) we get from the session

  Post.create({
    title: title,
    content: content,
    author: id
  })
    .then(post => {
      // after we've created a post we can update the user document who created the post
      // we know which user to update, because it's the current user that's been logged in
      // the second object pushes the id of the post in the user.posts array
      return User.findByIdAndUpdate(
        id,
        { $push: { posts: post._id } },
        { new: true }
      );
    })
    .then(updatedUser => {
      res.redirect("/profile");
    });
});

router.get("/", (req, res) => {
  //If we want to find all the posts and their related authors (users)
  Post.find()
    .populate("author")
    .then(posts => {
      res.render("posts", { posts });

    });
});

module.exports = router;
