const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const order = new Order({
      ...req.body,
      user: decoded.userId
    });
    
    const savedOrder = await order.save();
    
    // Clear user's cart after successful order
    await User.findByIdAndUpdate(decoded.userId, { cart: [] });
    
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's orders
router.get('/my-orders', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const orders = await Order.find({ user: decoded.userId })
      .populate('orderItems.product')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const order = await Order.findOne({
      _id: req.params.id,
      user: decoded.userId
    }).populate('orderItems.product');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (Admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        orderStatus,
        ...(trackingNumber && { trackingNumber }),
        ...(orderStatus === 'delivered' && { deliveryDate: new Date() })
      },
      { new: true }
    ).populate('orderItems.product');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    // Filter by status
    if (req.query.status) {
      query.orderStatus = req.query.status;
    }
    
    // Filter by date range
    if (req.query.startDate || req.query.endDate) {
      query.orderDate = {};
      if (req.query.startDate) query.orderDate.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.orderDate.$lte = new Date(req.query.endDate);
    }
    
    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .populate('orderItems.product', 'name images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalOrders: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const order = await Order.findOne({
      _id: req.params.id,
      user: decoded.userId
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (order.orderStatus === 'shipped' || order.orderStatus === 'delivered') {
      return res.status(400).json({ error: 'Cannot cancel shipped or delivered orders' });
    }
    
    order.orderStatus = 'cancelled';
    await order.save();
    
    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
