import mongoose from "mongoose";

const ParagraphSchema = new mongoose.Schema({
  paragraph: {
    type: String,
    required: true,
  },
});

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
    
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  content: {
    type: [ParagraphSchema],
    required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
