import { Request, Response } from "express";
import { STATUS_CODES } from "../../../constants";
import { makuService } from "../services/maku.service";
import { handleErrorResponse } from "../../../utils";

class MakuController {
  public async getVehicleTypes(req: Request, res: Response) {
    try {
      const vehicleTypes = await makuService.getVehicleTypes();
      res.status(STATUS_CODES.OK).json({
        message: "Fetched cab types",
        data: {
          vehicleTypes,
        },
      });
    } catch (error: any) {
      handleErrorResponse(res, error);
    }
  }

  // create Vehicle Type

  public async createVehicleType(req:Request,res:Response){
    try {
      const vehicleType =await makuService.createVehicleType(req.body);
      res.status(STATUS_CODES.OK).json({
        message: "Vechicle Type Created  successful",
        data: vehicleType,
      });
    } catch (error :any ) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: "Create failed",
        error: error.message,
      });
    }
  }

  //update makuTypes 

  public async updateVehicleTypes(req:Request ,res:Response){
  
try {
  const vehicleTypes = await makuService.updateVehicleType(req.params.id,req.body);
  res.status(STATUS_CODES.OK).json({
    message: "Vechicle Type update  successful",
    data: vehicleTypes,
  });
} catch (error: any) {
  res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
    message: "Update failed",
    error: error.message,
  });
}
  }

//Get Vechicle type by id 
  public async getVechicleTypeById(req:Request ,res:Response){
    const { id } = req.params;
    try {
      const vehicleType = await makuService.getVehicleTypesById(id);
      res.status(STATUS_CODES.OK).json({
        message: " successful",
        data: vehicleType,
      });
    } catch (error: any) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: " failed",
        error: error.message,
      });
    }
      }

  async getTripDetails(req: Request, res: Response) {
    const { tripId } = req.params;
    try {
      const trip = await makuService.getTripDetails(tripId);
      res.status(STATUS_CODES.OK).json({
        message: "Fetched trip details",
        data: { trip },
      });
    } catch (error: any) {
      handleErrorResponse(res, error);
    }
  }
}

export const makuController = new MakuController();
