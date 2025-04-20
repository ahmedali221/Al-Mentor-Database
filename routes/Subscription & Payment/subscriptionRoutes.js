const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
} = require("../../controllers/Subscription & Payment/subscriptionController");

router.post("/", createSubscription);
router.get("/", getAllSubscriptions);

module.exports = router;
