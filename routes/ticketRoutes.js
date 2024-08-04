const express = require('express');
const { purchaseTicket, createTicket } = require('../Controllers/ticketController');


const router = express.Router();

router.post('/create', createTicket);
router.post('/purchase', purchaseTicket);

module.exports = {ticketRoutes:router};
