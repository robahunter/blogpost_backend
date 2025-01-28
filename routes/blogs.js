const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middlewares/auth');
const router = express.Router();

// Create Blog
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const blog = await Blog.create({ userId: req.user.id, title, content, tags });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('userId', 'username');
  res.json(blogs);
});

// Update Blog
router.patch('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    Object.assign(blog, req.body);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/rate', auth, async (req, res) => {
    const { rating } = req.body;
  
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }
  
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ error: 'Blog not found.' });
  
      // Check if the user has already rated this blog
      const existingRating = blog.ratings.find((r) => r.userId.toString() === req.user.id);
  
      if (existingRating) {
        // Update existing rating
        existingRating.rating = rating;
      } else {
        // Add new rating
        blog.ratings.push({ userId: req.user.id, rating });
      }
  
      await blog.save();
      res.json({ message: 'Rating submitted successfully.', averageRating: blog.averageRating });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get Blog Ratings
  router.get('/:id/ratings', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate('ratings.userId', 'username');
      if (!blog) return res.status(404).json({ error: 'Blog not found.' });
  
      res.json({
        averageRating: blog.averageRating,
        ratings: blog.ratings,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;
