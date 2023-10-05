import { Router } from "express";
import * as newsController from "../controllers/newsController";

const router = Router();

// ADD News
router.post("/", newsController.addNews);

// GET ALL News
router.get("/", newsController.getAllNews);

// GET AN News
router.get("/:id", newsController.getNewsByID);

// UPDATE News
router.put("/:id", newsController.updateNews);

// DELETE News
router.delete("/:id", newsController.deleteNews);

export default router;
