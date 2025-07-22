const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const cloudinary = require('cloudinary').v2;
const pLimit = require('p-limit');

// Cloudinary config (make sure .env vars are loaded in your main app)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoryList = await Category.find();

    if (!categoryList || categoryList.length === 0) {
      return res.status(404).json({ success: false, message: 'No categories found' });
    }

    res.status(200).json(categoryList);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'The category with the given ID was not found' });
    }

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Invalid category ID or server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully!',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting category',
      error: err.message,
    });
  }
});



// POST create new category with image uploads
router.post('/create', async (req, res) => {
  try {
    const limit = pLimit(2); // Limit concurrent uploads

    const { name, color, images } = req.body;

    if (!name || !color || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ success: false, message: 'Name, color, and at least one image are required.' });
    }

    // Upload images to Cloudinary with error handling per image
    const uploadResults = [];

    for (let i = 0; i < images.length; i++) {
      try {
        const result = await limit(() => cloudinary.uploader.upload(images[i]));
        uploadResults.push(result.secure_url);
      } catch (uploadErr) {
        console.error(`Image ${i + 1} upload failed:`, uploadErr.message);
      }
    }

    if (uploadResults.length === 0) {
      return res.status(500).json({ success: false, message: 'All image uploads failed.' });
    }

    // Create and save the category
    const category = new Category({
      name,
      images: uploadResults,
      color,
    });

    const savedCategory = await category.save();
    return res.status(201).json(savedCategory);

  } catch (err) {
    console.error('Error creating category:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});





router.put('/:id', async (req, res) => {
  try {
    const limit = pLimit(2); // 2 concurrent uploads

    // Validate input
    if (!req.body.name || !req.body.color || !Array.isArray(req.body.images)) {
      return res.status(400).json({ success: false, message: 'Name, color, and images are required' });
    }

    // Upload images to Cloudinary
    const imagesToUpload = req.body.images.map((image) => {
      return limit(() => cloudinary.uploader.upload(image));
    });

    const uploadResults = await Promise.all(imagesToUpload);
    const imgUrls = uploadResults.map((item) => item.secure_url);

    if (!imgUrls || imgUrls.length === 0) {
      return res.status(500).json({ success: false, message: 'Images could not be uploaded' });
    }

    // Update category
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        images: imgUrls,
        color: req.body.color,
      },
      { new: true } // Return updated document
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found or update failed' });
    }

    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error while updating category',
      error: err.message,
    });
  }
});

module.exports = router;
