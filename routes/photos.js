const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Photo = require("../models/Photo");

const multer = require("multer");
const upload = multer({ dest: __dirname + "/../public/images/album/" });

router.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    const { filename, orignalName, path } = req.file;
    const { title } = req.body;
    const authour = req.session.user._id;
    const newPhoto = await Photo.create({
      filename,
      title,
      path,
      orignalName,
      authour
    });
    await User.findByIdAndUpdate(req.session.user._id, {
      $push: { photos: newPhoto._id }
    });
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const photos = await Photo.find().populate("authour");
    res.render("photos", { photos });
  } catch (err) {
    next(err);
  }
});


router.get("/:id" , (req,res,next ) => {
    try {
        const photos = await Photo.find({auhtour:req.params.id}).populate("authour");
        res.render("photos", { photos });
      } catch (err) {
        next(err);
      }
})

module.exports = router;
