import mongoose from "mongoose";

const violationSchema = new mongoose.Schema({
    vehicle: {
      type: String,
      ref: 'Vehicle',
      required: true
    },
    violationType: {
      type: String,
      enum: ['SPEEDING', 'PARKING', 'SIGNAL', 'DOCUMENTS'],
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    fineAmount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'DISPUTED'],
      default: 'PENDING'
    }
  }, 
  { timestamps: true }
);

export const Violation = mongoose.model('Violation', violationSchema)