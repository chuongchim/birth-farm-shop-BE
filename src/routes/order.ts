import { Router } from "express";
import * as orderController from "../controllers/orderController";

const router = Router();

// ADD Order
router.post("/", orderController.addOrder);

// GET ALL Order
router.get("/", orderController.getAllOrder);

// GET AN Order
router.get("/:id", orderController.getOrderByID);

// UPDATE Order
router.put("/:id", orderController.updateOrder);

// DELETE Order
router.delete("/:id", orderController.deleteOrder);

export default router;
