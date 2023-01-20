const express = require('express');
const router = express.Router();
const { createTrain } = require('../controllers/trains');

router.post('/train', createTrain);

module.exports = router;
