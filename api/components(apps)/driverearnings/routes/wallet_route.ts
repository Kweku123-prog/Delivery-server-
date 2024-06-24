import { Router } from "express";
import { getEarningsByDriverId, saveEarnings ,updateEarningsByDriverId } from '../controller/wallet_controller';
import { jwtUtils } from "../../../utils";

class EarnRoute {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.route('/').post(saveEarnings);
    this.router.get('/earnings/:driverId', getEarningsByDriverId);
    this.router.put('/earnings/update/:driverId', updateEarningsByDriverId);
   
  }
}

export const earnRoutes = new EarnRoute()