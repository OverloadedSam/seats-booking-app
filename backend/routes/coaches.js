const express = require('express');
const router = express.Router();
const { createCoach, reserveSeats } = require('../controllers/coaches');

router.post('/coach', createCoach);
router.post('/reserve-seats', reserveSeats);

module.exports = router;
