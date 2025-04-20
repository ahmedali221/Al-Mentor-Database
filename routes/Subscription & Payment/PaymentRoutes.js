const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/Subscription & Payment/PaymentController");

router.post("/", paymentController.createPayment);
router.get("/user/:userId", paymentController.getPaymentsByUser);

module.exports = router;
