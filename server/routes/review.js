import express from "express";
import Product, { Review } from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  const allReviews = await Review.find();
  res.json(allReviews);
});

//for testing
router.post("/create", async (req, res) => {
  try {
    const { text, userId, userName, productId, imageUrl, star } = req.body;
    console.log(req.body);

    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (user && product) {
      const newReview = new Review({
        text,
        userId,
        userName,
        productId,
        imageUrl,
        star,
      });
      const reviewResponse = await newReview.save();
      if (reviewResponse) {
        product.reviews.push(reviewResponse);
        await product.save();
        const updatedProducts = await Product.find();
        res.json({
          status: "SUCESS",
          updatedProducts,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error,
    });
  }
});

export default router;
