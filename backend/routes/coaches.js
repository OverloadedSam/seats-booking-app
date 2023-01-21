const express = require('express');
const router = express.Router();
const {
  createCoach,
  getCoach,
  reserveSeats,
} = require('../controllers/coaches');

router.post('/coach', createCoach);
router.get('/coach/:id', getCoach);
router.post('/reserve-seats', reserveSeats);

module.exports = router;
