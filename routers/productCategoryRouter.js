const express = require("express");
const router = express.Router();
const ProductCategoryController = require("../controllers/productCategoryController");

// POST /categories - Create a new product category
router.post("/", ProductCategoryController.createProductCategory);

// GET /categories - Get all product categories
router.get("/", ProductCategoryController.getAllProductCategories);

// GET /categories/:id - Get product category by ID
router.get("/:id", ProductCategoryController.getProductCategoryById);

// PUT /categories/:id - Update a product category
router.put("/:id", ProductCategoryController.updateProductCategory);

// DELETE /categories/:id - Delete a product category
router.delete("/:id", ProductCategoryController.deleteProductCategory);

module.exports = router;
