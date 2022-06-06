const router = require("express").Router();
const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

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
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
 
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      res.status(401).json({
        message: "Wrong credentials!"
      })
    };

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET);
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json({
       message: "Wrong credentials!"
      })
    }

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    },
      process.env.JWT_SECRET,
      {expiresIn: '3d'}
    )

    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken })
    
  } catch (error) {
      console.log(error);
      return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  } 
})

module.exports = router;