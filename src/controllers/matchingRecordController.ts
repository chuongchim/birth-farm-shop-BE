import { Request, Response } from 'express';
import MatchingRecord, { MatchingRecordDocument } from '../model/matchingrecord';

const matchingRecordController = {
    createMatchingRecord: async (req: Request, res: Response) => {
        try {
            const { bird1ID, bird2ID, customerMessage, statusCode, phase, customerID } = req.body;
            const matchingRecord: MatchingRecordDocument = new MatchingRecord({
                bird1ID,
                bird2ID,
                customerMessage,
                statusCode,
                phase,
                customerID,
            });
            const savedMatchingRecord = await matchingRecord.save();
            res.status(200).json(savedMatchingRecord);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    changeBirdInMatchingRecord: async (req: Request, res: Response) => {
        try {
            const { bird1ID, bird2ID } = req.body;
            const { id } = req.params;
            const matchingRecord = await MatchingRecord.findById(id);
            if (matchingRecord && matchingRecord.phase === 'pending') {
                matchingRecord.bird1ID = bird1ID;
                matchingRecord.bird2ID = bird2ID;
                const updatedMatchingRecord = await matchingRecord.save();
                res.status(200).json(updatedMatchingRecord);
            } else {
                res.status(404).json({ message: 'Matching record not found or not in pending phase.' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllMatchingRecords: async (req: Request, res: Response) => {
        try {
            const matchingRecords: MatchingRecordDocument[] = await MatchingRecord.find();
            res.status(200).json(matchingRecords);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getMatchingRecordsByCustomer: async (req: Request, res: Response) => {
        try {
            const { customerId } = req.params;
            const matchingRecords: MatchingRecordDocument[] = await MatchingRecord.find({ customerID: customerId });
            res.status(200).json(matchingRecords);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateMatchingRecordStatusCode: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { newStatusCode } = req.body;
            const matchingRecord = await MatchingRecord.findByIdAndUpdate(id, { $set: { statusCode: newStatusCode } }, { new: true });
            if (matchingRecord) {
                res.status(200).json(matchingRecord);
            } else {
                res.status(404).json({ message: 'Matching record not found.' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateMatchingRecordPhase: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { newPhase, message } = req.body;
            const matchingRecord = await MatchingRecord.findByIdAndUpdate(
                id,
                { $set: { phase: newPhase, message: message } },
                { new: true }
            );
            if (matchingRecord) {
                res.status(200).json(matchingRecord);
            } else {
                res.status(404).json({ message: 'Matching record not found.' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    denyMatchingRequest: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { message } = req.body;
            const matchingRecord = await MatchingRecord.findByIdAndUpdate(
                id,
                { $set: { phase: 'denied', message: message } },
                { new: true }
            );
            if (matchingRecord) {
                res.status(200).json(matchingRecord);
            } else {
                res.status(404).json({ message: 'Matching record not found.' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default matchingRecordController;
