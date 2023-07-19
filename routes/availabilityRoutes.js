const express = require('express');
const {
  createAvailability,
  updateAvailability,
  deleteAvailability,
} = require('../controllers/availabilityController');
const { requireAuthentication } = require('../middlewares/authentication');

const router = express.Router();

router.post('/', requireAuthentication, createAvailability);
router.put('/:id', requireAuthentication, updateAvailability);
router.delete('/:id', requireAuthentication, deleteAvailability);

module.exports = router;