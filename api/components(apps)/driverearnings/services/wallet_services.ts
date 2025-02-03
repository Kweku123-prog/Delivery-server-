import { STATUS_CODES } from "../../../constants";
import { HandleException } from "../../../utils";
import  {MyMoney,MyMoneyModel} from "../models/driver_wallet";




class WalletService2{


    
async getAllDriversWallet() {
    try {
        const earining = await MyMoneyModel.find(
       
        )    .select("-__v ")
        .lean();


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
public static async DoesWalletExist(driverId: string): Promise<boolean> {
    const data = await MyMoneyModel.findOne({driverId});

    return data != null;
}
async createDriverWallet(myMoney: MyMoney): Promise<MyMoney> {

try {
    const model =new MyMoneyModel(myMoney);

    //check if wallet already exist 
    const driverId =myMoney.driverId
    const data = await MyMoneyModel.findOne({driverId});
if(data){
    throw new HandleException(
        STATUS_CODES.CONFLICT,
        "Wallet already Exist for this Driver "
    );
}


    return model.save();

    
} catch (error:any) {
    console.error("Admin signup error:", error);
    throw new HandleException(error.status, error.message);
}

}


async getWalletbyId(id: string){
    const query={
        driverId:id,
    };
    const wallet = await MyMoneyModel.find(query)   .select("-__v ")
    .lean();

     

    if (!wallet )
        throw new HandleException(
            STATUS_CODES.NOT_FOUND,
            "Wallet not found"
        );

    return wallet;
}


async getAllWallet() {
    const wallet = await MyMoneyModel.find()
        .select("-__v ")
        .lean();

    if (!wallet )
        throw new HandleException(
            STATUS_CODES.NOT_FOUND,
            "No Wallet  found"
        );

    return wallet;
}




}

    



export const walletService2 = new WalletService2();