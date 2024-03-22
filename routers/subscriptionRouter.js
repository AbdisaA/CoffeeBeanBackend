const express = require("express");
const router = express.Router();
const SubscriptionController = require("../controllers/subscriptionController");

// POST /subscriptions - Create a new subscription
router.post("/", SubscriptionController.createSubscription);

// GET /subscriptions - Get all subscriptions
router.get("/", SubscriptionController.getAllSubscriptions);

module.exports = router;
