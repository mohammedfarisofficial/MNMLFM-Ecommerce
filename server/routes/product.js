import express from "express";
import { allProducts ,addProduct, getProduct} from "../controllers/product.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, allProducts);
router.post("/create",addProduct)
router.get("/:productId",verifyToken,getProduct)

export default router;
