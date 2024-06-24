import { Request, Response } from 'express';
import Earnings from '../models/driver_wallet';

export const saveEarnings = async (req: Request, res: Response) => {
  const { driverId, earnings, date } = req.body;

  // Validate input
  if (!driverId || typeof earnings !== 'number' || !date) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Save earnings data to MongoDB
    const newEarnings = new Earnings({ driverId, earnings, date });
    await newEarnings.save();

    res.status(201).json({ message: 'Earnings data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save earnings data' });
  }
};
