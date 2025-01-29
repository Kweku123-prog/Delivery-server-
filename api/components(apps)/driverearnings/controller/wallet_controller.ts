
import { Request, Response } from 'express';

import { STATUS_CODES } from '../../../constants';
import { HandleException, handleErrorResponse } from '../../../utils';

import { walletService2 } from '../services/wallet_services';
import {MyMoney,MyMoneyModel, validateWalletCredentials} from '../models/driver_wallet';
import { messaging } from 'firebase-admin';

export const saveEarnings = async (req: Request, res: Response) => {
  const { driverId, earnings, date } = req.body;

  // Validate input
  if ( typeof earnings !== 'number' || !date) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Save earnings data to MongoDB
    const newEarnings = new MyMoneyModel({ driverId, earnings, date });
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
///Create Driver  wallet 

export const createDriverWallet  =async(req:Request,res:Response)=>{
  try {
    const wallet =new MyMoneyModel(req.body);

    //todo create validation 
   await  validateWalletCredentials(wallet);
  const data  =await  walletService2.createDriverWallet(wallet);
    return res.status(201).json({
      error: false,
      message:"Wallet Created Successfully",
      data

    });
  } catch (error:any) {
    return res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
      error: true,
      message: error.message,
    });
    
  }
}

///Get Driver wallet 
export const getDriverWalletById =async (req:Request,res:Response)=>{
  try {
    const wallet =await walletService2.getWalletbyId(req.params.id);
    return res.status(STATUS_CODES.OK).json({
      message:'success',
      data:wallet});
  }catch (error: any) {
    return res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
      error: true,
      message: error.message || "Server error",
    });
  }
}

export const getEarningsByDriverId = async (req: Request, res: Response) => {
    const { driverId } = req.params;
  
    try {
      const earnings = await MyMoneyModel.find({ driverId });
  
      if (earnings.length === 0) {
        return res.status(404).json({ message: 'No earnings found for this driver' });
      }
  
      res.status(200).json({
        earnings
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve earnings data' });
    }
  };

//Get all wallets

export const getAllDriverWallet =async (req:Request,res:Response)=>{
  try {
    const wallet =await walletService2.getAllWallet();
    return res.status(STATUS_CODES.OK).json({
      message:'success',
      data:wallet});
  }catch (error: any) {
    return res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
      error: true,
      message: error.message || "Server error",
    });
  }
}


export const updateEarningsByDriverId = async (req: Request, res: Response) => {
    const { driverId } = req.params;
    const { earnings } = req.body;
  
    // Validate input
    if (typeof earnings !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
  
    try {
      const updatedEarnings = await MyMoneyModel.findOneAndUpdate(
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
      const updatedEarnings = await MyMoneyModel.findOneAndUpdate(
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