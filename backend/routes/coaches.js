const express = require('express');
const router = express.Router();
const { createCoach } = require('../controllers/coaches');

router.post('/coach', createCoach);

module.exports = router;
