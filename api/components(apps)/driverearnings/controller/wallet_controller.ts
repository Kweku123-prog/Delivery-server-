
import { Request, Response } from 'express';
import Earnings from '../models/driver_wallet';
import Earning from '../models/driver_wallet';
import { STATUS_CODES } from '../../../constants';
import { HandleException, handleErrorResponse } from '../../../utils';

import { walletService2 } from '../services/wallet_services';
import MyMoney from '../models/driver_wallet';

export const saveEarnings = async (req: Request, res: Response) => {
  const { driverId, earnings, date } = req.body;

  // Validate input
  if ( typeof earnings !== 'number' || !date) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Save earnings data to MongoDB
    const newEarnings = new MyMoney({ driverId, earnings, date });
    await newEarnings.save();

    res.status(201).json({ message: 'Earnings data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save earnings data' });
  }
};

export const getAllEarning =async(req:Request,res:Response)=>{


  try {
    const earning=await walletService2.getAllDriversWallet();
res.status(STATUS_CODES.OK).json({
message: "Fetched Drivers Earnings ",
data: { earning },
});
}
catch (error: any) {
handleErrorResponse(res, error);
}

}

export const getEarningsByDriverId = async (req: Request, res: Response) => {
    const { driverId } = req.params;
  
    try {
      const earnings = await MyMoney.find({ driverId });
  
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
      const updatedEarnings = await MyMoney.findOneAndUpdate(
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

  export const updatePayOutDetailsByDriverId = async (req: Request, res: Response) => {
    const { driverId } = req.params;
    const { bankName,bankCode,accountName,accountNumber } = req.body;
  
    // Validate input
   
  
    try {
      const updatedEarnings = await MyMoney.findOneAndUpdate(
        { driverId },
        { bankName,bankCode,accountName,accountNumber },
        { new: true }
      );
  
      if (!updatedEarnings) {
        return res.status(404).json({ message: 'Wallet record not found' });
      }
  
      res.status(200).json(updatedEarnings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Payout  data' });
    }
  };