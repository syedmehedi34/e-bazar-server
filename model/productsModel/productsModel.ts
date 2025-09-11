import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: String,  },
  rating: { type: Number,  min: 0, max: 5 },
  comment: { type: String,  },
}, { _id: false }); 

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, minlength: 300 },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  currency: { type: String, default: "BDT" },
  category: { type: String, required: true },
  subCategory: { type: String },
  brand: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  sizes: [{ type: String }],
  images: [{ type: String }], 
  reviews: [reviewSchema],
  tags: [{ type: String }],

}, { timestamps: true }); 

const ProductsModel = mongoose.model("Product", productSchema);

export default ProductsModel
