import mongoose from 'mongoose';
import { stringsUtils } from '../../../utils';

const EarningsSchema = new mongoose.Schema({
  id: { 

	type: String,
			required: true,
			default: () => stringsUtils.generateUniqueString(4),



   },
   driverId: { type: String, required: true },
  
  earnings: { type: Number, required: true },
  bankName: {type:String}, // For bank names or mobile money service providers
  bankCode: {type:String},
  accountName: {type:String},
  accountNumber: {type:String}, // Account number for both bank and mobile money


  date: { type: String},
});

const MyMoney = mongoose.model('MyMoney', EarningsSchema);

export default MyMoney;
