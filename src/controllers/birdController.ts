import { Request, Response } from 'express';
import Bird, { BirdDocument } from '../model/bird';

const birdController = {
    addBird: async (req: Request, res: Response) => {
        try {
            const newBird = new Bird(req.body);
            const saveBird = await newBird.save();
            res.status(200).json(saveBird);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllBird: async (req: Request, res: Response) => {
        try {
            const birds: BirdDocument[] = await Bird.find().populate(["typeID", "healthCareID"]);
            res.status(200).json(birds);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getBirdByID: async (req: Request, res: Response) => {
        try {
            res.status(200).json((await Bird.findById(req.params.id).populate(["typeID", "healthCareID"])));
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateBird: async (req: Request, res: Response) => {
        try {
            const bird: BirdDocument | null = await Bird.findById(req.params.id);
            if (bird) {
                await bird.updateOne({ $set: req.body });
                res.status(200).json({ message: "Update Bird Success" });
            } else {
                res.status(404).json({ message: "Bird not found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteBird: async (req: Request, res: Response) => {
        try {
            const BirdDocument = await Bird.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Delete Bird Success" });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default birdController;

export function addBird(req: Request, res: Response) {
    birdController.addBird(req, res);
}

export function getAllBird(req: Request, res: Response) {
    birdController.getAllBird(req, res)
}

export function getBirdByID(req: Request, res: Response) {
    birdController.getBirdByID(req, res)
}

export function updateBird(req: Request, res: Response) {
    birdController.updateBird(req, res)
}

export function deleteBird(req: Request, res: Response) {
    birdController.deleteBird(req, res)
}

