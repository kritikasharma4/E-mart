const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/products');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// POST create order (authenticated)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items?.length || !shippingAddress)
      return res.status(400).json({ message: 'Items and shipping address are required' });

    const itemsTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingPrice = itemsTotal >= 999 ? 0 : 49;
    const totalPrice = itemsTotal + shippingPrice;

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      itemsTotal,
      shippingPrice,
      totalPrice,
    });

    // Decrement stock
    await Promise.all(
      items.map((i) =>
        Product.findByIdAndUpdate(i.product, { $inc: { countInStock: -i.qty } })
      )
    );

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all orders (admin)
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const { status, limit = 20, skip = 0 } = req.query;
    const filter = status ? { status } : {};
    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .sort({ dateCreated: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    res.json({ total, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET stats for admin dashboard
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    const [totalOrders, revenueResult, pendingOrders, deliveredOrders] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]),
      Order.countDocuments({ status: 'Pending' }),
      Order.countDocuments({ status: 'Delivered' }),
    ]);
    res.json({
      totalOrders,
      revenue: revenueResult[0]?.total || 0,
      pendingOrders,
      deliveredOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single order (admin or owner)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name images');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (!req.user.isAdmin && order.user._id.toString() !== req.user.id)
      return res.status(403).json({ message: 'Access denied' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update order status (admin)
router.put('/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const update = { status };
    if (status === 'Delivered') { update.isDelivered = true; update.deliveredAt = new Date(); }

    const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
