require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('../config/db');
const processRoutes = require('../routes/processRoutes');
const cadRoutes = require('../routes/cadRoutes');
const productRoutes = require('../routes/productRoutes');
const supportRoutes = require('../routes/supportRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Add security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/process', processRoutes);
app.use('/api/cad', cadRoutes);
app.use('/api/product', productRoutes);
app.use('/api/support', supportRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
