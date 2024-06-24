import mongoose from 'mongoose';
import { stringsUtils } from '../../../utils';

const EarningsSchema = new mongoose.Schema({
  driverId: { 

	type: String,
			required: true,
			default: () => stringsUtils.generateUniqueString(4),



   },
  
  earnings: { type: Number, required: true },
  date: { type: String, required: true },
});

const Earnings = mongoose.model('Earnings', EarningsSchema);

export default Earnings;
