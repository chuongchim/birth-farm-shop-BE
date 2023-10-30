import { Request, Response } from 'express';
import MatchingRecord, { MatchingRecordDocument } from '../model/matchingrecord';

const matchingRecordController = {
    createMatchingRecord: async (req: Request, res: Response) => {
        try {
            const { bird1ID, bird2ID, customerID, customerMessage, phase, pending} = req.body;
            const matchingRecord: MatchingRecordDocument = new MatchingRecord({
                bird1ID,
                bird2ID,
                customerID,
                customerMessage,
                phase,
                pending
                //generally verify 
                //chim khac gioi
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
            //da test
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
            //bat dau test
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

export function createMatchingRecord(req: Request, res: Response) {
    matchingRecordController.createMatchingRecord(req, res);
}

export function changeBirdInMatchingRecord(req: Request, res: Response) {
    matchingRecordController.changeBirdInMatchingRecord(req, res);
}

export function getAllMatchingRecords(req: Request, res: Response) {
    matchingRecordController.getAllMatchingRecords(req, res);
}

export function getMatchingRecordsByCustomer(req: Request, res: Response) {
    matchingRecordController.getMatchingRecordsByCustomer(req, res);
}

export function updateMatchingRecordPhase(req: Request, res: Response) {
    matchingRecordController.updateMatchingRecordPhase(req, res);
}


export function denyMatchingRequest(req: Request, res: Response) {
    matchingRecordController.denyMatchingRequest(req, res);
}