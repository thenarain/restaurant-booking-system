const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');
const { requireAuthentication } = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', requireAuthentication, getUserProfile);

module.exports = router;