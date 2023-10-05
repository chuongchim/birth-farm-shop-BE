import { Router } from "express";
import * as invoiceController from "../controllers/invoiceController";

const router = Router();

// ADD Invoice
router.post("/", invoiceController.addInvoice);

// GET ALL Invoice
router.get("/", invoiceController.getAllInvoice);

// GET AN Invoice
router.get("/:id", invoiceController.getInvoiceByID);

// UPDATE Invoice
router.put("/:id", invoiceController.updateInvoice);

// DELETE Invoice
router.delete("/:id", invoiceController.deleteInvoice);

export default router;
