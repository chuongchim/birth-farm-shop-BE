import { Request, Response, Router } from "express";
import * as voucherController from "../controllers/voucherController";

const router = Router();

// ADD Voucher
router.post("/", voucherController.addVoucher);

// GET ALL Voucher
router.get("/", voucherController.getAllVoucher);

// GET AN Voucher
router.get("/:id", voucherController.getVoucherByID);

// UPDATE Voucher
router.put("/:id", voucherController.updateVoucher);

// DELETE Voucher
router.delete("/:id", voucherController.deleteVoucher);

export default router;
