// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

// Get user details route (Protected)
router.get('/me', authenticate, userController.getUserDetails);

// Update user route (Protected)
router.put('/me', authenticate, userController.updateUser);

// Delete user route (Protected)
router.delete('/me', authenticate, userController.deleteUser);

module.exports = router;
