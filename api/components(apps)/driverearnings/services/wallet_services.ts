import { STATUS_CODES } from "../../../constants";
import { HandleException } from "../../../utils";
import MyMoney from "../models/driver_wallet";

import Earning from "../models/driver_wallet";

class WalletService2{


    
async getAllDriversWallet() {
    try {
        const earining = await MyMoney.find(
       
        );

        if (!earining.length) {
            throw new HandleException(
                STATUS_CODES.NOT_FOUND,
                "No Wallet found"
            );
        }

        return earining;
    } catch (error: any) {
        throw new HandleException(error.status, error.message);
    }
}

    
}


export const walletService2 = new WalletService2();