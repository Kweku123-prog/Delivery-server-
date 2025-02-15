import { Twilio } from "twilio";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SID,
} from "../../../config";
import { HandleException } from "../../../utils";
import { STATUS_CODES } from "../../../constants";

class VerifyService {
  private twilioClient: Twilio;
  private verifyServiceSID: string;

  constructor() {
    this.twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    this.verifyServiceSID = `${TWILIO_VERIFY_SID}`;
  }

  sendVerificationCode = async (recipientPhoneNumber: string) => {
    try {
      const verification = await this.twilioClient.verify.v2
        .services(this.verifyServiceSID)
        .verifications.create({
        
          to: recipientPhoneNumber,
          channel: "sms",
        });
      return verification;
    } catch (error) {
      throw error;
    }
  };

  checkVerificationCode = async (
    recipientPhoneNumber: string,
    otpCode: string
  ) => {
    try {
      const verificationCheck = await this.twilioClient.verify.v2
        .services(this.verifyServiceSID)
        .verificationChecks.create({
          to: recipientPhoneNumber,
          code: otpCode,
        });

      if (verificationCheck.status === "approved") {
        return true;
      } else {
        throw new HandleException(STATUS_CODES.BAD_REQUEST, "Invalid code");
      }
    } catch (error) {
      throw error;
    }
  };
}

export const verifyService = new VerifyService();
