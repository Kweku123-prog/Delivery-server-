// src/controllers/constantsController.ts
import { Request, Response } from 'express';
import Constants from '../model/settings_models';

export const createConstants = async (req: Request, res: Response): Promise<void> => {
    const { distancePerKmAmount, durationPerMinuteAmount, baseFareAmount ,commision} = req.body;
    try {
        const constants = new Constants({ distancePerKmAmount, durationPerMinuteAmount, baseFareAmount,commision });
        await constants.save();
        res.status(201).json(constants);
    } catch (error) {
        res.status(400).json({ message: "Not found" });
    }
};

export const updateConstants = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { distancePerKmAmount, durationPerMinuteAmount, baseFareAmount,commision } = req.body;
    try {
        const constants = await Constants.findByIdAndUpdate(id, { distancePerKmAmount, durationPerMinuteAmount, baseFareAmount,commision}, { new: true });
        if (!constants) {
            res.status(404).json({ message: 'Constants not found' });
            return;
        }
        res.json(constants);
    } catch (error) {
        res.status(400).json({ message:"Not found"});
    }
};

export const getConstants = async (req: Request, res: Response): Promise<void> => {
    try {
        const constants = await Constants.find();
        res.json(constants);
    } catch (error) {
        res.status(400).json({ message: "not found " });
    }
};
