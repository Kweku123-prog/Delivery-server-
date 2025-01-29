import { Router } from "express";
import { createDriverWallet, getAllEarning, getEarningsByDriverId, saveEarnings ,updateEarningsByDriverId, updatePayOutDetailsByDriverId } from '../controller/wallet_controller';
import { jwtUtils } from "../../../utils";

class EarnRoute {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.route('/').post(saveEarnings);
    this.router.get('/getAllEarn',getAllEarning);
    this.router.post('/createWallet',createDriverWallet);
    this.router.get('/earnings/:driverId', getEarningsByDriverId);
    this.router.put('/earnings/update/:driverId', updateEarningsByDriverId);
    this.router.put('/earnings/updatePayout/:driverId', updatePayOutDetailsByDriverId);
   //getAllDriversEarning
  }
}

export const earnRoutes = new EarnRoute()