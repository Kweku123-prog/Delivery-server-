import mongoose from 'mongoose';
import { stringsUtils } from '../../../utils';





const ConstantsSchema = new mongoose.Schema({
    id: { 
  
      type: String,
              required: true,
              default: () => stringsUtils.generateUniqueString(4),
  
  
  
     },
   
     commision: { type: Number, required: true },
     distancePerKmAmount: { type: Number, required: true },
     durationPerMinuteAmount: { type: Number, required: true },
     baseFareAmount: { type: Number, required: true }
  });
  
  const Constants = mongoose.model('Constants', ConstantsSchema);
interface IConstants extends Document {
    distancePerKmAmount: number;
    durationPerMinuteAmount: number;
    baseFareAmount: number;
}



export default Constants;
