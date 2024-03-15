const { default: mongoose } = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    email: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Subscription = mongoose.model("Subscription", SubscriptionSchema);

module.exports = Subscription;
