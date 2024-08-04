const express = require('express');
const {
  createTrainService,
  getTrainService,
  updateTrainService,
  getAllTrainServices
} = require('../Controllers/trainServiceController');

const router = express.Router();

router.post('/create', createTrainService);


router.get('/:id', getTrainService);


router.put('/:id', updateTrainService);


router.get('/', getAllTrainServices);

module.exports = {trainServiceRoutes:router};
