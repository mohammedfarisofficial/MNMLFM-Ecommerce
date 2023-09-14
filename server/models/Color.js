import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
});


const Color = mongoose.model("Color", colorSchema);
export default Color;