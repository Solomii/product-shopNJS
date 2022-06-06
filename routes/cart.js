const router = require("express").Router();

const Cart = require("../models/Cart");

const {verifyToken, verifyTokenAntAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/find/:userId', verifyTokenAntAuthorization, async (req, res) => {
  const _id = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId: _id });

    if (!cart) {
      return res.status(400).json("Cart not found");
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart)
  } catch (error) {
    res.status(500).json(error);
  }
})

router.put('/:id', verifyTokenAntAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateCart); 
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', verifyTokenAntAuthorization, async (req, res) => {
  const _id = req.params.id;
  try {
    const cart = await Cart.findByIdAndDelete(_id);

    if (!cart) {
      return res.status(400).json("Cart not found");
    }

   res.status(200).json("Cart deleted successfully");
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;