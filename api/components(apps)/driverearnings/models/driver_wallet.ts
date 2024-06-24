import mongoose from 'mongoose';

const EarningsSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  earnings: { type: Number, required: true },
  date: { type: String, required: true },
});

const Earnings = mongoose.model('Earnings', EarningsSchema);

export default Earnings;
