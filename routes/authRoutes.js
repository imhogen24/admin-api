const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/login', (req, res) => {
  // Simple login that just checks the admin password
  res.status(200).json({
    message: 'Login successful',
    success: true
  });
});

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Access to protected route',
    success: true
  });
});

module.exports = router;
