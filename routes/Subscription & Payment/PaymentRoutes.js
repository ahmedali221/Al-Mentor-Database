const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/Subscription & Payment/PaymentController");

router.post("/", paymentController.createPayment);
router.get("/user/:userId", paymentController.getPaymentsByUser);
router.get("/", paymentController.getAllPayments);
// delete payment
router.delete("/:paymentId", paymentController.deletePayment);

module.exports = router;
