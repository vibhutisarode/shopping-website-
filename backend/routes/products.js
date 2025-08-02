const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by brand
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
    
    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }
    
    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Filter by in stock
    if (req.query.inStock === 'true') {
      query.inStock = true;
      query.stockQuantity = { $gt: 0 };
    }
    
    // Sorting
    let sort = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-low':
          sort.price = 1;
          break;
        case 'price-high':
          sort.price = -1;
          break;
        case 'rating':
          sort['rating.average'] = -1;
          break;
        case 'newest':
          sort.createdAt = -1;
          break;
        default:
          sort.createdAt = -1;
      }
    } else {
      sort.createdAt = -1;
    }
    
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'firstName lastName');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const products = await Product.find({ category })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments({ category });
    
    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product (Admin only)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review to product
router.post('/:id/reviews', async (req, res) => {
  try {
    const { rating, comment, userId } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Check if user already reviewed this product
    const existingReview = product.reviews.find(review => 
      review.user.toString() === userId
    );
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }
    
    const review = {
      user: userId,
      rating,
      comment
    };
    
    product.reviews.push(review);
    
    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating.average = totalRating / product.reviews.length;
    product.rating.count = product.reviews.length;
    
    await product.save();
    
    const populatedProduct = await Product.findById(req.params.id)
      .populate('reviews.user', 'firstName lastName');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
