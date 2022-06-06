const router = require("express").Router();

const Order = require("../models/Order");

const { verifyToken, verifyTokenAntAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/find/:userId', verifyTokenAntAuthorization, async (req, res) => {
  const _id = req.params.userId;
  try {
    const order = await Order.find({ userId: _id });

    if (!order) {
      return res.status(400).json("Order not found");
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error)
  }
})


router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateOrder); 
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const order = await Order.findByIdAndDelete(_id);

    if (!order) {
      return res.status(400).json("Order not found");
    }

   res.status(200).json("Order deleted successfully");
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;