const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  //post has one user (one to one relationship)
  author: { type: Schema.Types.ObjectId, ref: "User" } //define relation with user
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
