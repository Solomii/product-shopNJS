const router = require("express").Router();

const Product = require("../models/Product");

const {verifyTokenAndAdmin, } = require("./verifyToken");


router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error);
  }
})


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/find/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(400).json("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateProduct); 
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(_id);

    if (!product) {
      return res.status(400).json("Product not found");
    }

   res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;