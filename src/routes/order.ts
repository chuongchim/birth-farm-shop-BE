import { Router } from "express";
import * as orderController from "../controllers/orderController";
import middlewareController from "../middleware/middlewareController";

const router = Router();

// ADD Order
router.post("/", middlewareController.verifyToken, orderController.addOrder);

// GET ALL Order
router.get("/", middlewareController.verifyTokenAndAdminAuth, orderController.getAllOrder);
 
// GET AN Order
router.get("/:id", middlewareController.verifyToken, orderController.getOrderByID);

router.get("/user/:id", orderController.getOrderByUserId);

// UPDATE Order
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, orderController.updateOrder);

router.put ("/update/:id", orderController.updateOrderStatus);

// DELETE Order
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, orderController.deleteOrder);

export default router;
