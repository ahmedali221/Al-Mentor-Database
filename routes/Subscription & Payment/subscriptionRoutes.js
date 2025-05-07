const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
  deleteSubscription,
  updateSubscription, 
} = require("../../controllers/Subscription & Payment/subscriptionController");

router.post("/", createSubscription);
router.get("/", getAllSubscriptions);
router.delete("/:id", deleteSubscription);
router.put("/:id", updateSubscription); 

module.exports = router;
