const express = require("express");
const router = express.Router();
const ProductReviewController = require("../controllers/productReviewController");

// POST /product-reviews - Create a new product review
router.post("/", ProductReviewController.createProductReview);

// GET /product-reviews - Get all product reviews
router.get("/", ProductReviewController.getAllProductReviews);

// GET /product-reviews/:id - Get product review by ID
router.get("/:id", ProductReviewController.getProductReviewById);

// PUT /reviews/:id - Update a product review
router.put("/:id", ProductReviewController.updateProductReview);

// DELETE /reviews/:id - Delete a product review
router.delete("/:id", ProductReviewController.deleteProductReview);

module.exports = router;
