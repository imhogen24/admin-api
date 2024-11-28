const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/admin-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Admin API is running',
    success: true
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
