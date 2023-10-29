import { Router } from "express";
import * as birdController from "../controllers/birdController";
import middlewareController from "../middleware/middlewareController";

const router = Router();

// ADD BIRD
router.post("/", middlewareController.verifyTokenAndAdminAuth, birdController.addBird);

// GET ALL BIRD
router.get("/", birdController.getAllBird);

// GET AN BIRD
router.get("/:id", birdController.getBirdByID);

// UPDATE BIRD BY ID
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, birdController.updateBird);

// DELETE BIRD
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, birdController.deleteBird);

export default router;
