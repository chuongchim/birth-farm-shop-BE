import { Router } from "express";
import * as customerController from "../controllers/customerController";

const router = Router();

// ADD CUSTOMER
router.post("/", customerController.addCustomer);

// GET ALL CUSTOMER
router.get("/", customerController.getAllCustomer);

// GET AN CUSTOMER
router.get("/:id", customerController.getCustomerByID);

// UPDATE CUSTOMER
router.put("/:id", customerController.updateCustomer);

// DELETE CUSTOMER
router.delete("/:id", customerController.deleteCustomer);

export default router;
