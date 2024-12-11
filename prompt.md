Root dir: Admin API

config dir:
 ```db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/admin-dashboard', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```
```env.js
// nothing in it so far
```

contollers dir:
```authController.js
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { password } = req.body;

    // Check if the provided password matches the admin password in environment
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
```
```blogController.js
const Blog = require('../models/Blog');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving blogs',
      error: error.message
    });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const blog = new Blog({
      title,
      content,
      tags: tags || [],
      status: status || 'draft'
    });

    const savedBlog = await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: savedBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, status } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;
    if (status) blog.status = status;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};
```
```serviceContoller.js
//nothing in it so far
```

middleware dir:
```auth.js
const authMiddleware = (req, res, next) => {
  const providedPassword = req.headers['admin-password'];

  if (!providedPassword || providedPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized: Invalid admin password' });
  }

  next();
};

module.exports = authMiddleware;
```

```errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

models dir:
```Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Method to check password
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Pre-save hook to hash password
AdminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
```
```Blog.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Admin'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);
```
```Service.js
//nothing in so far
```

routes dir:
```authRoutes.js
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
```
```blogRoutes.js
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
```
```serviceRoutes.js
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
```
utils dir:
```validationHelpers.js
//nothing in there so far
```

```.env
PORT=5000
MONGODB_URI=mongodb+srv://imhogen22:jLqAIj91BaPYhWif@cluster0.x7uyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=2ad4d2bcbf4df0c49def284bdf5a6d236091f0625f21d4bdd2699ba4c0a010e71141c3b76ddb40b8418fe6846a8051f738bfa3631e7a5ca076f6cbd969d524c2
ADMIN_PASSWORD=@Ii%0245
```

```server.js
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
```
