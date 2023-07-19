const express = require('express');
const {
  createBooking,
  searchAvailableTables,
} = require('../controllers/bookingController');
const { requireAuthentication } = require('../middlewares/authentication');

const router = express.Router();

router.post('/', requireAuthentication, createBooking);
router.get('/search', searchAvailableTables);

module.exports = router;