import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  address: String,
  district: {
    type: String,
    required: true,
  },
  isDispatch: {
    type: Boolean,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  trackLocations: [
    {
      type: String,
    },
  ],
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productSize: {
    type: String,
    required: true,
  },
  productColor: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  productImageUrl: {
    type: String,
    default: "https://metaeya.com/store-front/images/product-default.png",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
