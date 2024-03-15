const { default: mongoose } = require("mongoose");

const ProductReviewSchema = new mongoose.Schema({
  content: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number },
});
const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

module.exports = ProductReview;
