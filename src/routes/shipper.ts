import { Router } from "express";
import * as shipperController from "../controllers/shipperController";

const router = Router();

// ADD Shipper
router.post("/", shipperController.addShipper);

// GET ALL Shipper
router.get("/", shipperController.getAllShipper);

// GET AN Shipper
router.get("/:id", shipperController.getShipperByID);

// UPDATE Shipper
router.put("/:id", shipperController.updateShipper);

// DELETE Shipper
router.delete("/:id", shipperController.deleteShipper);

export default router;
