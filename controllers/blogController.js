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
      const posts = await BlogPost.find()
        .populate('userId', 'username'); // Populate the correct path 'userId'
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get a single blog post
exports.getPostById = async (req, res) => {
    try {
      const post = await BlogPost.findById(req.params.id)
        .populate('userId', 'username'); // Correct field: 'userId' instead of 'author'
        
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
  
      // Ensure 'userId' is not updated as it is a reference field
      const updatedPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      ).populate('userId', 'username'); // Populate after updating the post
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Delete a blog post
  exports.deletePost = async (req, res) => {
    try {
      const post = await BlogPost.findByIdAndDelete(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Add a comment to a blog post
exports.addComment = async (req, res) => {
    try {
      const { content } = req.body;
      const userId = req.user.userId; // Assume you're using a middleware to get the logged-in user's ID
  
      const post = await BlogPost.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Add the comment to the comments array
      post.comments.push({ userId, content });
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Update a comment on a blog post
  exports.updateComment = async (req, res) => {
    try {
      const { content } = req.body;
      const { commentId } = req.params;
  
      const post = await BlogPost.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Find the comment by its ID
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Update the comment's content
      comment.content = content;
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Delete a comment from a blog post
  exports.deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const post = await BlogPost.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Remove the comment by its ID
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      comment.remove();
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  