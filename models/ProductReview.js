const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

module.exports = ProductReview;
