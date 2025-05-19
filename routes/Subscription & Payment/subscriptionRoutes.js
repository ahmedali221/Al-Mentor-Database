const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
  deleteSubscription,
  updateSubscription,
  getSubscriptionById
} = require("../../controllers/Subscription & Payment/subscriptionController");

router.post("/", createSubscription);
router.get("/", getAllSubscriptions);
router.get("/:id", getSubscriptionById);
router.delete("/:id", deleteSubscription);
router.put("/:id", updateSubscription); 

module.exports = router;
