import express from "express";
import Size from "../models/Size.js";

const router = express.Router();


router.post("/create", async (req, res) => {
    const { size } = req.body;
    try {
      const isExist = await Size.find({ size });
      if (!isExist) {
        return res
          .status(400)
          .json({ msg: "Color already exist!.Please try to add new color." });
      }
      const newSize = new Size({
        size,
      });
      await newSize.save();
      console.log(`${newSize} new color added to the colors `);
      return res.status(200).json({ newSize });
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  export default router