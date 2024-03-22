const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const path = require("path");
const fs = require("fs");

// Function to create the destination folder if it doesn't exist
function createDestinationFolder(destination) {
  const folderPath = path.resolve(destination);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder recursively
  }
}

// Multer middleware for handling file uploads
const createMulterMiddleware = require("../middleware/multer");
createDestinationFolder("Images/Product/"); // Create destination folder if not exist
const uploadMiddleware = createMulterMiddleware("Images/Product/"); // Specify the destination folder

// POST /products - Create a new product
router.post(
  "/",
  uploadMiddleware.array("images"),
  ProductController.createProduct
);

// GET /products - Get all products
router.get("/", ProductController.getAllProducts);

// GET /products/:id - Get product by ID
router.get("/:id", ProductController.getProductById);

// PUT /products/:id - Update a product
router.put("/:id", ProductController.updateProduct);
router.put(
  "/:id/images",
  uploadMiddleware.array("images"),
  ProductController.updateProductImages
);

// DELETE /products/:id - Delete a product
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
