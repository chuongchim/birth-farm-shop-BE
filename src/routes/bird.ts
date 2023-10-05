import { Router } from "express";
import * as birdController from "../controllers/birdController";

const router = Router();

// ADD BIRD
router.post("/", birdController.addBird);

// GET ALL BIRD
router.get("/", birdController.getAllBird);

// GET AN BIRD
router.get("/:id", birdController.getBirdByID);

// UPDATE BIRD BY ID
router.put("/:id", birdController.updateBird);

// DELETE BIRD
router.delete("/:id", birdController.deleteBird);

export default router;
