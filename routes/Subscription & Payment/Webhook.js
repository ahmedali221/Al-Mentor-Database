const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../../controllers/Subscription & Payment/stripeWebhook');

router.post('/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
