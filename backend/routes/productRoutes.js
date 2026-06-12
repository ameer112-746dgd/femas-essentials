const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');

// Configure Multer to store image in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @desc    Fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(404).json({ message: 'Invalid ID' });
  }
});

// @desc    Add a new product (Image to MongoDB)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, ingredients, usage } = req.body;
    
    if (!req.file) return res.status(400).json({ message: 'Please upload an image' });

    const product = new Product({
      name, description, price, category, ingredients, usage,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.ingredients = req.body.ingredients || product.ingredients;
      product.usage = req.body.usage || product.usage;

      if (req.file) {
        product.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
      }
      await product.save();
      res.json({ message: 'Product Updated' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
});

// @desc    Delete a product (FIXED)
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (result) res.json({ message: 'Product deleted successfully' });
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;