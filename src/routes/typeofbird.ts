import { Router } from "express";
import * as typeOfBirdController from "../controllers/typeOfBirdController";

const router = Router();

// ADD TypeOfBird
router.post("/", typeOfBirdController.addTypeOfBird);

// GET ALL TypeOfBird
router.get("/", typeOfBirdController.getAllTypeOfBird);

// GET AN TypeOfBird
router.get("/:id", typeOfBirdController.getTypeOfBirdByID);

// UPDATE TypeOfBird
router.put("/:id", typeOfBirdController.updateTypeOfBird);

// DELETE TypeOfBird
router.delete("/:id", typeOfBirdController.deleteTypeOfBird);

export default router;
