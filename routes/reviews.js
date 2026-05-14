const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Product = require('../models/products');
const { authMiddleware } = require('../middleware/auth');

// GET reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort({ dateCreated: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST submit a review (authenticated)
router.post('/:productId', authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment)
      return res.status(400).json({ message: 'Rating and comment are required' });

    const existing = await Review.findOne({ product: req.params.productId, user: req.user.id });
    if (existing)
      return res.status(409).json({ message: 'You have already reviewed this product' });

    const review = await Review.create({
      product: req.params.productId,
      user: req.user.id,
      name: req.user.name,
      rating,
      comment,
    });

    // Recalculate product rating
    const reviews = await Review.find({ product: req.params.productId });
    const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(req.params.productId, { rating: Math.round(avgRating * 10) / 10 });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a review (owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not your review' });
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
