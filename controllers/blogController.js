// controllers/blogController.js

const BlogPost = require('../models/Blog');

// Create a blog post
exports.createPost = async (req, res) => {
    try {
      const { title, content, tags } = req.body;
  
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
  
      // Ensure the userId is populated from the authentication middleware
      const post = new BlogPost({
        title,
        content,
        tags, // Optionally pass tags if provided in the request body
        userId: req.user.userId, // Attach userId from the authenticated user
      });
  
      await post.save(); // Save the post to the database
  
      res.status(201).json({ message: 'Blog post created', post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single blog post
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a blog post
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Blog post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
