import { Router } from "express";
import * as nestController from "../controllers/nestController";

const router = Router();

// ADD Nest
router.post("/", nestController.addNest);

// GET ALL Nest
router.get("/", nestController.getAllNest);

// GET AN Nest
router.get("/:id", nestController.getNestByID);

// UPDATE Nest
router.put("/:id", nestController.updateNest);

// DELETE Nest
router.delete("/:id", nestController.deleteNest);

export default router;
