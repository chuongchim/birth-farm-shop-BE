import { Router } from "express";
import * as gatewayController from "../controllers/gatewayController";

const router = Router();

// ADD Gateway
router.post("/", gatewayController.addGateway);

// GET ALL Gateway
router.get("/", gatewayController.getAllGateway);

// GET AN Gateway
router.get("/:id", gatewayController.getGatewayByID);

// UPDATE Gateway
router.put("/:id", gatewayController.updateGateway);

// DELETE Gateway
router.delete("/:id", gatewayController.deleteGateway);

export default router;
