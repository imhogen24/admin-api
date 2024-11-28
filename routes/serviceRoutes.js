const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Service routes are working',
    services: []
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Service creation route working',
    success: true
  });
});

module.exports = router;
