const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { requireAuthentication };