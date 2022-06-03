const router = require("express").Router();
const User = require("../models/User");

const CryptoJS = require("crypto-js");

router.post("/register", async (req, res) => {

  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString()
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }


})

module.exports = router;