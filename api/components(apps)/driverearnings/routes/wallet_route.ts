import { Router } from "express";
import { saveEarnings } from '../controller/wallet_controller';
import { jwtUtils } from "../../../utils";

class EarnRoute {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.route('/').post(saveEarnings)
    
   
  }
}

export const earnRoutes = new EarnRoute()