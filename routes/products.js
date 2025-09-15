const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Product = require('../models/products');
const cloudinary = require('cloudinary').v2;
const pLimit = require('p-limit');

// GET all products with populated category
router.get('/', async (req, res) => {
  try {
    const { limit = 12, skip = 0, category, brand, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Product.countDocuments(filter);
    const productList = await Product.find(filter)
      .populate('category')
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.status(200).json({ total, products: productList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET featured products
router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).populate('category');
    res.status(200).json(featuredProducts);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create a new product
router.post('/create', async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const limit = pLimit(2);
    if (!req.body.name || !Array.isArray(req.body.images)) {
      return res.status(400).json({ success: false, message: 'Name and images are required' });
    }

    const imagesToUpload = req.body.images.map((image) => {
      return limit(() => cloudinary.uploader.upload(image));
    });

    const uploadResults = await Promise.all(imagesToUpload);
    const imgUrls = uploadResults.map((item) => item.secure_url);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      images: imgUrls,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      isFeatured: req.body.isFeatured,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    return res.status(404).json({ message: 'Product not found!', status: false });
  }
  res.status(200).send({ message: 'Product deleted!', status: true });
});

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const limit = pLimit(2);
    const imagesToUpload = req.body.images.map((image) => {
      return limit(() => cloudinary.uploader.upload(image));
    });

    const uploadResults = await Promise.all(imagesToUpload);
    const imgUrls = uploadResults.map((item) => item.secure_url);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        images: imgUrls,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product update failed!', success: false });
    }

    res.status(200).json({ message: 'Product updated!', success: true, product });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;