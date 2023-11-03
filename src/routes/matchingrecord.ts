import { Router } from "express";
import * as matchingRecordController from "../controllers/matchingRecordController";

const router = Router();

// CREATE MATCHING RECORD
// router.post("/", middlewareController.verifyToken, matchingRecordController.createMatchingRecord);
router.post("/", matchingRecordController.createMatchingRecord);

// CHANGE BIRD IN MATCHING RECORD REQUEST (only in phase "pending")
// router.put("/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.changeBirdInMatchingRecord);
router.put("/:id", matchingRecordController.changeBirdInMatchingRecord);

// GET ALL MATCHING RECORDS (only for Admin)
// router.get("/", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.getAllMatchingRecords);
router.get("/", matchingRecordController.getAllMatchingRecords);

// GET ALL MATCHING RECORDS OF A CUSTOMER (use authorization)
// router.get("/customer/:customerId", middlewareController.verifyToken, matchingRecordController.getMatchingRecordsByCustomer);
router.get("/customer/:customerId", matchingRecordController.getMatchingRecordsByCustomer);

// UPDATE STATUS CODE (only for Admin)
// router.put("/status/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.updateMatchingRecordStatusCode);

// UPDATE PHASE AND GIVE MESSAGE (only for Admin)
// router.put("/phase/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.updateMatchingRecordPhase);
router.put("/phase/:id", matchingRecordController.updateMatchingRecordPhase);

// DENY A MATCHING REQUEST (only Admin)
// router.put("/deny/:id", middlewareController.verifyTokenAndAdminAuth, matchingRecordController.denyMatchingRequest);
router.put("/deny/:id", matchingRecordController.denyMatchingRequest);

// Add this route in your Express app
// router.delete('/:id', middlewareController.verifyToken, matchingRecordController.cancelMatchingRequestByCustomer);
router.delete('/:id', matchingRecordController.cancelMatchingRequestByCustomer);
// Chi de cho Tuan Kiet test API thoi
router.delete('/', matchingRecordController.deleteAllMatchingRecords);


export default router;