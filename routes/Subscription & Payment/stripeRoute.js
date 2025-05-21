const express = require("express");
const router = express.Router();
const stripeController = require("../../controllers/Subscription & Payment/StripeController");

router.post("/createCheckoutSession", stripeController.createCheckoutSession);

module.exports = router;
