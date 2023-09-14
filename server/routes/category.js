import express from "express";
import Category from "../models/Category.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "SUCESS",
      categories,
    });
  } catch (error) {
    res.json({ status: "FAILED", message: error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { category, coverUrl } = req.body;
    console.log(category, coverUrl);
    if ((category && coverUrl) !== "") {
      const newCategory = new Category({ category, coverUrl });
      await newCategory.save();
      res.json({ status: "SUCESS", newCategory });
    }
  } catch (error) {
    res.json({ status: "FAILED", message: error });
  }
});

export default router;
