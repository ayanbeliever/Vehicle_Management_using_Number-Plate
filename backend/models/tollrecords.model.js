import mongoose from "mongoose";

const tollRecordSchema = new mongoose.Schema({
    vehicle: {
      type: String,
      ref: 'Vehicle',
      required: true
    },
    tollBoothId: {
      type: String,
      required: true
    },
    passageTime: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PENDING', 'FAILED'],
      default: 'PENDING'
    },
    paymentMethod: String
  }, 
  { timestamps: true }
);

export const TollRecord = mongoose.model('Tollrecord', tollRecordSchema)