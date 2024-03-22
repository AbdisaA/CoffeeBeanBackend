const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  createProduct: async (req, res) => {
    try {
      // Extract other product data from request body
      const { name, description, price, productCategoryId } = req.body;

      // Check if files were uploaded
      const images = req.files ? req.files.map((file) => file.filename) : [];

      // Create new product instance with extracted data
      const newProduct = new Product({
        name,
        description,
        price,
        productCategoryId,
        images, // Assign uploaded image filenames to the product
      });

      // Save the product to the database
      await newProduct.save();

      // Respond with success message
      res.status(201).json({
        message: "Product created successfully.",
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price, productCategoryId } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, productCategoryId },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      res.status(200).json({
        message: "Product updated successfully.",
        product: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
  updateProductImages: async (req, res) => {
    try {
      const productId = req.params.id;

      // Check if files were uploaded
      const images = req.files ? req.files.map((file) => file.filename) : [];

      // Find the product by ID and update its images
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $push: { images: { $each: images } } }, // Push new images to the existing array
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      res
        .status(200)
        .json({
          message: "Product images updated successfully.",
          product: updatedProduct,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      res.status(200).json({
        message: "Product deleted successfully.",
        product: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = ProductController;
