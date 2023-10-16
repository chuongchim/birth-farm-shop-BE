import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

// ADD Product
router.post("/", productController.addProduct);

// GET ALL Product
router.get("/", productController.getAllProduct);

// GET AN Product
router.get("/:id", productController.getProductByID);

// UPDATE Product
router.put("/:id", productController.updateProduct);

// DELETE Product
router.delete("/:id", productController.deleteProduct);

export default router;
