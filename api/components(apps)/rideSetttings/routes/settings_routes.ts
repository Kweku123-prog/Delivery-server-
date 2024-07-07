import { Router } from "express";

import { jwtUtils } from "../../../utils";
import { createConstants, getConstants, updateConstants } from "../controllers/settings_controller";
import { saveEarnings } from "../../driverearnings/controller/wallet_controller";

class ConstantsRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
 
   this.router.post('/', createConstants);
    this.router.put('/updateConstants/:id', updateConstants);
    this.router.get('/', getConstants);
   //getAllDriversEarning
  }
}

export const constantsRoutes = new ConstantsRoutes()




