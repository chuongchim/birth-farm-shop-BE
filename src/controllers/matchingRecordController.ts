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
    
            // Valid phases and their order
            const validPhases = ['pending', 'matching', 'success', 'raising'];
    
            // Find the current matchingRecord
            const currentRecord = await MatchingRecord.findById(id);
    
            if (!currentRecord) {
                return res.status(404).json({ message: 'Matching record not found.' });
            }
    
            // Check if the new phase is valid and not "denied"
            if (newPhase === 'denied' || !validPhases.includes(newPhase)) {
                return res.status(400).json({ message: 'Invalid phase provided.' });
            }
    
            // Get the index of the current and new phases
            const currentPhaseIndex = validPhases.indexOf(currentRecord.phase);
            const newPhaseIndex = validPhases.indexOf(newPhase);
    
            // Ensure the new phase is the next stage in the order
            if (newPhaseIndex !== currentPhaseIndex + 1) {
                return res.status(400).json({ message: 'Invalid phase transition.' });
            }
    
            // Update the matchingRecord's phase and message based on newPhase
            currentRecord.phase = newPhase;
            switch (newPhase) {
                case 'matching':
                    currentRecord.matching = message;
                    break;
                case 'success':
                    currentRecord.success = message;
                    break;
                case 'raising':
                    currentRecord.raising = message;
                    break;
                default:
                    break;
            }
    
            // Save the updated matchingRecord
            await currentRecord.save();
    
            res.status(200).json(currentRecord);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    denyMatchingRequest: async (req: Request, res: Response) => {
        try {
            // okay
            const { id } = req.params;
            const { message } = req.body;
            
            const checkPhase = await MatchingRecord.findOne({ _id: id, phase: 'pending' });
    
            if (!checkPhase) {
                // If matchingRecord is not pending, throw an error
                return res.status(400).json({ message: "Can't deny a record if it isn't pending." });
            }
    
            const matchingRecord = await MatchingRecord.findByIdAndUpdate(
                id,
                { $set: { phase: 'denied', denied: message } },
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
    }
    
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