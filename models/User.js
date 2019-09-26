const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  mood: String,
  password: { type: String },
  //user can have many posts (one to manys)
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  googleID: { type: String, unique: true },
  profileImg: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
