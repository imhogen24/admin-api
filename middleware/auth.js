const authMiddleware = (req, res, next) => {
  const providedPassword = req.headers['admin-password'];

  if (!providedPassword || providedPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Unauthorized: Invalid admin password' });
  }

  next();
};

module.exports = authMiddleware;
