const { default: mongoose } = require("mongoose");

const PaymentSchema = mongoose.Schema({
  orderId: { type: String },
  amount: { type: Number },
  payment_method: { type: String },
  status: { type: String, enum: ["pending", "completed", "failed"] },
  transaction_id: { type: String },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
