import { Router } from "express";
import * as orderDetailController from "../controllers/orderDetailController";

const router = Router();

// ADD OrderDetail
router.post("/", orderDetailController.addOrderDetail);

// GET ALL OrderDetail
router.get("/", orderDetailController.getAllOrderDetail);

// GET AN OrderDetail
router.get("/:id", orderDetailController.getOrderDetailByID);

// UPDATE OrderDetail
router.put("/:id", orderDetailController.updateOrderDetail);

// DELETE OrderDetail
router.delete("/:id", orderDetailController.deleteOrderDetail);

export default router;
