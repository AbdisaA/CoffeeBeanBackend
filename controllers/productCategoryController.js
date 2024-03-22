const ProductCategory = require("../models/productCategory");

const ProductCategoryController = {
  createProductCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = new ProductCategory({ name });
      await newCategory.save();
      res.status(201).json({
        message: "Product category created successfully.",
        category: newCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getAllProductCategories: async (req, res) => {
    try {
      const categories = await ProductCategory.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getProductCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await ProductCategory.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Product category not found." });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateProductCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const categoryId = req.params.id;

      const updatedCategory = await ProductCategory.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Product category not found." });
      }

      res.status(200).json({
        message: "Product category updated successfully.",
        category: updatedCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  deleteProductCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await ProductCategory.findByIdAndDelete(
        categoryId
      );

      if (!deletedCategory) {
        return res.status(404).json({ message: "Product category not found." });
      }

      res.status(200).json({
        message: "Product category deleted successfully.",
        category: deletedCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = ProductCategoryController;
