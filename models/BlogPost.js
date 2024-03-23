const { default: mongoose } = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory" },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
``;
