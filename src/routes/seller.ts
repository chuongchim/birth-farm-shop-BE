import { Router } from "express";
import * as sellerController from "../controllers/sellerController";

const router = Router();

// ADD Seller
router.post("/", sellerController.addSeller);

// GET ALL Seller
router.get("/", sellerController.getAllSeller);

// GET AN Seller
router.get("/:id", sellerController.getSellerByID);

// UPDATE Seller
router.put("/:id", sellerController.updateSeller);

// DELETE Seller
router.delete("/:id", sellerController.deleteSeller);

export default router;

