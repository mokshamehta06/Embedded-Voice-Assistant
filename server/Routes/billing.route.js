const express = require('express');
const { createOrder, verifyBilling } = require('../Controllers/billing.controller');
const isAuth = require('../Middleware/isAuth');

const router = express.Router();

router.post('/create-order', isAuth, createOrder);
router.post('/verify-payment', isAuth, verifyBilling);

module.exports = router;
