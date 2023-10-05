import { Router } from "express";
import * as healthCareProfessionalController from "../controllers/healthCareProffessionalController";

const router = Router();

// ADD HealthCareProfessional
router.post("/", healthCareProfessionalController.addHealthCareProfessional);

// GET ALL HealthCareProfessional
router.get("/", healthCareProfessionalController.getAllHealthCareProfessional);

// GET AN HealthCareProfessional
router.get("/:id", healthCareProfessionalController.getHealthCareProfessionalByID);

// UPDATE HealthCareProfessional
router.put("/:id", healthCareProfessionalController.updateHealthCareProfessional);

// DELETE HealthCareProfessional
router.delete("/:id", healthCareProfessionalController.deleteHealthCareProfessional);

export default router;
