import { Router } from "express";
import { saveEarnings } from '../controller/wallet_controller';
import { jwtUtils } from "../../../utils";

class EarnRoute {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.route('/earnings').post(saveEarnings)
    
   
  }
}

export const earnRoute = new EarnRoute()