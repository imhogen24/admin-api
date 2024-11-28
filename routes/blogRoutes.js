const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// Get all blogs (can be filtered by status)
router.get('/', getAllBlogs);

// Create a new blog (protected route)
router.post('/', authMiddleware, createBlog);

// Update a blog (protected route)
router.put('/:id', authMiddleware, updateBlog);

// Delete a blog (protected route)
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;
