const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Register user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile (requires authentication)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add to wishlist
router.post('/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }
    
    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();
    
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cart Routes
// Add item to cart
router.post('/cart/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if item already exists in cart
    const existingCartItem = user.cart.find(item => 
      item.product.toString() === productId
    );
    
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    
    await user.save();
    await user.populate('cart.product');
    
    res.json({
      message: 'Item added to cart',
      cart: user.cart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user cart
router.get('/cart', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId).populate('cart.product');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update cart item quantity
router.put('/cart/update', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const cartItem = user.cart.find(item => 
      item.product.toString() === productId
    );
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    if (quantity <= 0) {
      user.cart = user.cart.filter(item => 
        item.product.toString() !== productId
      );
    } else {
      cartItem.quantity = quantity;
    }
    
    await user.save();
    await user.populate('cart.product');
    
    res.json({
      message: 'Cart updated',
      cart: user.cart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/cart/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.cart = user.cart.filter(item => 
      item.product.toString() !== productId
    );
    
    await user.save();
    
    res.json({
      message: 'Item removed from cart',
      cart: user.cart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Clear cart
router.delete('/cart/clear', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.cart = [];
    await user.save();
    
    res.json({
      message: 'Cart cleared',
      cart: user.cart
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
