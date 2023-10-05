import { Router } from "express";
import * as productManagerController from "../controllers/productManagerController";

const router = Router();

// ADD ProductManager
router.post("/", productManagerController.addProductManager);

// GET ALL ProductManager
router.get("/", productManagerController.getAllProductManager);

// GET AN ProductManager
router.get("/:id", productManagerController.getProductManagerByID);

// UPDATE ProductManager
router.put("/:id", productManagerController.updateProductManager);

// DELETE ProductManager
router.delete("/:id", productManagerController.deleteProductManager);

export default router;
