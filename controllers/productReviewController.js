const ProductReview = require("../models/ProductReview");

const ProductReviewController = {
  createProductReview: async (req, res) => {
    try {
      const { content, userId, productId, rating } = req.body;
      const newReview = new ProductReview({
        content,
        user: userId,
        product: productId,
        rating,
      });
      await newReview.save();
      res.status(201).json({
        message: "Product review created successfully.",
        review: newReview,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getAllProductReviews: async (req, res) => {
    try {
      const reviews = await ProductReview.find();
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  getProductReviewById: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const review = await ProductReview.findById(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Product review not found." });
      }
      res.status(200).json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  updateProductReview: async (req, res) => {
    try {
      const { content, rating } = req.body;
      const reviewId = req.params.id;

      const updatedReview = await ProductReview.findByIdAndUpdate(
        reviewId,
        { content, rating },
        { new: true }
      );

      if (!updatedReview) {
        return res.status(404).json({ message: "Product review not found." });
      }

      res.status(200).json({
        message: "Product review updated successfully.",
        review: updatedReview,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  deleteProductReview: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const deletedReview = await ProductReview.findByIdAndDelete(reviewId);

      if (!deletedReview) {
        return res.status(404).json({ message: "Product review not found." });
      }

      res.status(200).json({
        message: "Product review deleted successfully.",
        review: deletedReview,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};

module.exports = ProductReviewController;
