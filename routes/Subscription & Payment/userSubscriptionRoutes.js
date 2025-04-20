const express = require("express");
const router = express.Router();
const {
  subscribeUser,
  getUserSubscriptions,
  cancelSubscription,
} = require("../../controllers/Subscription & Payment/userSubscriptionController");

router.post("/", subscribeUser);
router.get("/:userId", getUserSubscriptions);
router.put("/cancel/:id", cancelSubscription);

module.exports = router;
