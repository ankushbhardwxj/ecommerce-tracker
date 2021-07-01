const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./userModel");

router.post("/signup", async (req, res) => {
  try {
    let { username, password, fullName, type } = req.body;
    const userObject = new User({
      _id: new mongoose.Types.ObjectId(),
      fullName: fullName,
      username: username,
      password: password,
      type: type,
    });
    await userObject.save();
    res.status(201).json({
      action: "User sign up successful !",
      user: userObject,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.post("/signin", async (req, res) => {
  try {
    let { username, password } = req.body;
    let { password: actualPassword } = await User.findOne({
      username: username,
    }).exec();
    console.log(password, actualPassword);
    if (password === actualPassword)
      res.status(201).json({
        action: "user sign in successful",
      });
    else
      res.status(500).json({
        action: "Wrong username or password",
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
