import express from "express";
import Color from "../models/Color.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { code } = req.body;
  try {
    const isExist = await Color.find({ code });
    if (!isExist) {
      return res
        .status(400)
        .json({ msg: "Color already exist!.Please try to add new color." });
    }
    const newColor = new Color({
      code,
    });
    await newColor.save();
    console.log(`${newColor} new color added to the colors `);
    return res.status(200).json({ newColor });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


export default router
