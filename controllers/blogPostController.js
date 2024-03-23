const BlogPost = require("../models/BlogPost");

const blogPostController = {
  getAllBlogPosts: async (req, res) => {
    try {
      const blogPosts = await BlogPost.find();
      res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getBlogPostById: async (req, res) => {
    const postId = req.params.id;
    try {
      const blogPost = await BlogPost.findById(postId);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createBlogPost: async (req, res) => {
    const { title, content, userId, categoryId } = req.body;
    try {
      const newBlogPost = new BlogPost({ title, content, userId, categoryId });
      await newBlogPost.save();
      res.status(201).json(newBlogPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateBlogPostById: async (req, res) => {
    const postId = req.params.id;
    const { title, content, userId, categoryId } = req.body;
    try {
      const updatedBlogPost = await BlogPost.findByIdAndUpdate(
        postId,
        { title, content, userId, categoryId },
        { new: true }
      );
      if (!updatedBlogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(updatedBlogPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteBlogPostById: async (req, res) => {
    const postId = req.params.id;
    try {
      const deletedBlogPost = await BlogPost.findByIdAndDelete(postId);
      if (!deletedBlogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = blogPostController;
