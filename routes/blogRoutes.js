const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Blog routes are working',
    blogs: []
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Blog creation route working',
    success: true
  });
});

module.exports = router;
