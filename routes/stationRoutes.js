const express = require('express');
const {
  createStation,
  getStation,
  updateStation
} = require('../Controllers/stationController');

const router = express.Router();


router.post('/create', createStation);

router.get('/:id', getStation);


router.put('/:id', updateStation);

module.exports = {stationRoutes: router};
