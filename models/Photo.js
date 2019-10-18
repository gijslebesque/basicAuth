const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  filename: String,
  title: String,
  path: String,
  orignalName: String,
  //user can have many posts (one to manys)
  authour: { type: Schema.Types.ObjectId, ref: "User" }
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
