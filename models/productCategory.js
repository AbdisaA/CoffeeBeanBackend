const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

module.exports = ProductCategory;
