import mongoose, { InferSchemaType } from 'mongoose';
import { HandleException, stringsUtils } from '../../../utils';
import Joi, { required } from 'joi';
import { Earnings } from '../../wallet/models/wallet.models';
import { STATUS_CODES } from '../../../constants';

const EarningsSchema = new mongoose.Schema({
  id: { 

	type: String,
			required: true,
			default: () => stringsUtils.generateUniqueString(4),



   },
   driverId: { type: String, required: true },
  
  earnings: { type: Number, required: true },
  bankName: {type:String, required :true}, // For bank names or mobile money service providers
  bankCode: {type:String},
  accountName: {type:String,required:true},
  accountNumber: {type:String, required:true}, // Account number for both bank and mobile money


  date: { type: String},
});
export type MyMoney = InferSchemaType<typeof EarningsSchema>;

export const MyMoneyModel = mongoose.model<MyMoney>('MyMoney', EarningsSchema);


export const validateWalletCredentials = async (myMoney: MyMoney) => {
	const schema = Joi.object<MyMoney>({

		bankName: Joi.string().required().label("Your Bank Name "),

		accountNumber: Joi.string().required().label("Your account Number"),
	});

	const { bankName, accountNumber} = myMoney;

	const { error } = schema.validate(
		{
			bankName,
			accountNumber,
		
		} as MyMoney,
		{
			allowUnknown: false,
		}
	);

	if (!error) return;

	throw new HandleException(STATUS_CODES.BAD_REQUEST, error.message);
};
