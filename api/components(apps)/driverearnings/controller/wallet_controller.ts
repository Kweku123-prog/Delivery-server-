import { Request, Response } from 'express';
import Earnings from '../models/driver_wallet';

export const saveEarnings = async (req: Request, res: Response) => {
  const { driverId, earnings, date } = req.body;

  // Validate input
  if ( typeof earnings !== 'number' || !date) {
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



export const getEarningsByDriverId = async (req: Request, res: Response) => {
    const { driverId } = req.params;
  
    try {
      const earnings = await Earnings.find({ driverId });
  
      if (earnings.length === 0) {
        return res.status(404).json({ message: 'No earnings found for this driver' });
      }
  
      res.status(200).json(earnings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve earnings data' });
    }
  };



export const updateEarningsByDriverId = async (req: Request, res: Response) => {
    const { driverId } = req.params;
    const { earnings } = req.body;
  
    // Validate input
    if (typeof earnings !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
  
    try {
      const updatedEarnings = await Earnings.findOneAndUpdate(
        { driverId },
        { earnings },
        { new: true }
      );
  
      if (!updatedEarnings) {
        return res.status(404).json({ message: 'Earnings record not found' });
      }
  
      res.status(200).json(updatedEarnings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update earnings data' });
    }
  };