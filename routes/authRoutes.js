const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.status(200).json({
    message: 'Login route working',
    success: true
  });
});

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Auth routes are accessible',
    success: true
  });
});

module.exports = router;
