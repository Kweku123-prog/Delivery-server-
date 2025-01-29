import { Request, Response } from "express";
import {
	validateSigninCredentials,
	AdminModel,
	validateSignupCredentials,
} from "../models/admin.model";
import { jwtUtils } from "../../../utils";
import { adminAuthService } from "../services/admin.auth.service";
import { STATUS_CODES } from "../../../constants";
import { adminCustomerService } from "../services/admin.customers.services";

class AdminAuthController {
	async signup(req: Request, res: Response): Promise<Response> {
		try {
			const credentials = new AdminModel(req.body);

			// await validateSignupCredentials(credentials);

			await adminAuthService.signup(credentials);

			return res.status(201).json({
				error: false,
				message:
					"Account created successfully. You account is pending activation.",
			});
		} catch (error: any) {
			return res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
				error: true,
				message: error.message,
			});
		}
	}

	async signin(req: Request, res: Response): Promise<Response> {
		try {
			const credentials = new AdminModel(req.body);
			

			await validateSigninCredentials(credentials);

			const admin = await adminAuthService.signin(credentials);
			const  user_id =admin._id;
			const accessToken = jwtUtils.generateToken(admin, "1h");
			const refreshToken = jwtUtils.generateToken(admin, "14d");

			return res.status(200).json({
				message: "Authenticated successfully",
				accessToken,
				refreshToken,
				user_id
			
				
				
			});
		} catch (error: any) {
			return res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
				error: true,
				message: error.message,
			});
		}
	}



	async getAdmin(req: Request, res: Response): Promise<Response> {
		try {
			const admin = await adminCustomerService.getAdmin(req.params.id);
			return res.status(STATUS_CODES.OK).json(admin);
		} catch (error: any) {
			return res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
				error: true,
				message: error.message || "Server error",
			});
		}
	}
}

export const adminAuthController = new AdminAuthController();
