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
  date: { type: String, required: true },
});

const Earning = mongoose.model('Earning', EarningsSchema);

export default Earning;
