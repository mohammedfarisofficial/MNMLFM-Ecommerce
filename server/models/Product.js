import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/male-default-avatar-profile-gray-250nw-362901365.jpg",
    },
    star: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    desc: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
    isTop: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    colors: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export const Review = mongoose.model("Review", reviewSchema);
export default Product;
