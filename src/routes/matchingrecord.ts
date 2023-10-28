import { Router } from "express";
import middlewareController from "../middleware/middlewareController";
import * as matchingRecordController from "../controllers/matchingRecordController";

const router = Router();

// CREATE MATCHING RECORD
router.post("/", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.createMatchingRecord);

// CHANGE BIRD IN MATCHING RECORD REQUEST (only in phase "pending")
router.put("/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.changeBirdInMatchingRecord);

// GET ALL MATCHING RECORDS (only for Admin)
router.get("/", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.getAllMatchingRecords);

// GET ALL MATCHING RECORDS OF A CUSTOMER (use authorization)
router.get("/customer/:customerId", middlewareController.verifyToken, matchingRecordController.getMatchingRecordsByCustomer);

// UPDATE STATUS CODE (only for Admin)
router.put("/status/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.updateMatchingRecordStatusCode);

// UPDATE PHASE AND GIVE MESSAGE (only for Admin)
router.put("/phase/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.updateMatchingRecordPhase);

// DENY A MATCHING REQUEST (only Admin)
router.put("/deny/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.denyMatchingRequest);

export default router;
