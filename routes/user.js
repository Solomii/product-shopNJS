const router = require("express").Router();

const User = require("../models/User");
const { verifyToken, verifyTokenAntAuthorization } = require("./verifyToken")

router.put('/:id', verifyTokenAntAuthorization, async (req, res) => {
  if (req.user.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateUser)
    
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;