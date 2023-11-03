import { Router } from "express";
import * as birdController from "../controllers/birdController";
import middlewareController from "../middleware/middlewareController";

const router = Router();

// ADD BIRD
router.post("/", birdController.addBird);

// GET ALL BIRD
router.get("/", birdController.getAllBird);

// GET AN BIRD
router.get("/:id", birdController.getBirdByID);

// UPDATE BIRD BY ID
router.put("/:id", birdController.updateBird);

router.put("/update/:id", birdController.updateBirdStatus);

// DELETE BIRD
router.delete("/:id", birdController.deleteBird);

export default router;
