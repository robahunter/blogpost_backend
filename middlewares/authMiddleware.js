const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Extract userId from token

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { userId: user._id }; // Attach the userId to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
