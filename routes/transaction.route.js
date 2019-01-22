const express = require('express');
const router = express.Router();
const transactionService = require('../services/transaction.service')

router.post('/addUsers',transactionService.addUser);

module.exports =router;