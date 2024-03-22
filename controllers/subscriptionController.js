const Subscription = require("../models/Subscription");

const SubscriptionController = {
  createSubscription: async (req, res) => {
    try {
      const { userId, email } = req.body;
      const existingSubscription = await Subscription.findOne({ email });

      if (existingSubscription) {
        return res.status(400).json({ message: "Email already subscribed." });
      }

      const newSubscription = new Subscription({ email, userId });
      await newSubscription.save();

      res.status(201).json({ message: "Subscription created successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getAllSubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.find().populate("userId");
      res.status(200).json(subscriptions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = SubscriptionController;
