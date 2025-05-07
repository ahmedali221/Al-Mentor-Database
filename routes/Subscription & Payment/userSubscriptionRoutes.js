const express = require("express");
const router = express.Router();
const {
  subscribeUser,
  getUserSubscriptions,
  cancelSubscription,
  getAllUserSubscriptions,
  deleteUserSubscription, // Added deleteUserSubscription
} = require("../../controllers/Subscription & Payment/userSubscriptionController");

router.post("/user", subscribeUser);
router.get("/user/:userId", getUserSubscriptions);
router.put("/cancel/:id", cancelSubscription);
router.get("/", getAllUserSubscriptions);
router.delete("/:id", deleteUserSubscription); // Added delete route

module.exports = router;
