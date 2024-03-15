const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    total_amount: { type: Number },
    payment_status: {
      type: String,
      enum: ["new", "processing", "delivered", "canceled"],
    },
    status: { type: String, enum: ["paid", "unpaid", "refunded"] },
    shipping_address: { type: String },
    billing_address: { type: String },
  },

  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
