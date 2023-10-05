import { Router } from "express";
import * as foodController from "../controllers/foodController";

const router = Router();

// ADD Food
router.post("/", foodController.addFood);

// GET ALL Food
router.get("/", foodController.getAllFood);

// GET AN Food
router.get("/:id", foodController.getFoodByID);

// UPDATE Food
router.put("/:id", foodController.updateFood);

// DELETE Food
router.delete("/:id", foodController.deleteFood);

export default router;
