import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    comment: { type: String },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true }, // search index
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true }, // filter/sort
    discountPrice: { type: Number },
    currency: { type: String, default: "BDT" },
    category: { type: String, required: true, index: true }, // filter
    subCategory: { type: String, index: true },
    brand: { type: String, index: true },
    rating: { type: Number, default: 0, min: 0, max: 5, index: true }, // sort/filter
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
    sizes: [{ type: String }],
    images: [{ type: String }],
    reviews: [reviewSchema],
    tags: [{ type: String, index: true }],
  },
  { timestamps: true }
);


productSchema.index({ category: 1, price: 1 });
productSchema.index({ brand: 1, price: 1 });
productSchema.index({ createdAt: -1 }); 

const ProductsModel = mongoose.model("Product", productSchema);

export default ProductsModel;
