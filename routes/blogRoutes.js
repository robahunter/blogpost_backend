// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authenticate = require('../middlewares/authMiddleware');

// Create post (Protected)
router.post('/', authenticate, blogController.createPost);

// Get all posts
router.get('/', blogController.getAllPosts);

// Get a single post
router.get('/:id', blogController.getPostById);

// Update post (Protected)
router.put('/:id', authenticate, blogController.updatePost);

// Delete post (Protected)
router.delete('/:id', authenticate, blogController.deletePost);

module.exports = router;
