const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");

router.get("/", blogPostController.getAllBlogPosts);
router.get("/:id", blogPostController.getBlogPostById);
router.post("/", blogPostController.createBlogPost);
router.put("/:id", blogPostController.updateBlogPostById);
router.delete("/:id", blogPostController.deleteBlogPostById);

module.exports = router;
