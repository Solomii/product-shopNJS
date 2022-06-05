const router = require("express").Router();

const User = require("../models/User");
const { verifyToken, verifyTokenAntAuthorization, verifyTokenAndAdmin, } = require("./verifyToken");

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).json("User not found");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
    
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:id', verifyTokenAntAuthorization, async (req, res) => {
  if (req.user.password) {
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateUser);
    
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', verifyTokenAntAuthorization, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    return res.status(200).json("User deleted successfully");
    
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;