const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    images: [{ type: String }], // Array of image URLs
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
