const express = require('express');
const {
  addFunds,
  getWalletBalance
} = require('../Controllers/walletController');

const router = express.Router();


router.post('/add-funds', addFunds);
router.get('/balance/:userId', getWalletBalance);


module.exports = {walletRoutes:router};
