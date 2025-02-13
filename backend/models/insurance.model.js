import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
    vehicle: {
      type: String,
      ref: 'Vehicle',
      required: true
    },
    policyNumber: {
      type: String,
      required: true,
      unique: true
    },
    provider: {
        type: String,
        required: true
    },
    type: {
      type: String,
      enum: ['THIRD_PARTY', 'COMPREHENSIVE']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    premium: Number,
    coverage: Number,
    status: {
      type: String,
      enum: ['ACTIVE', 'EXPIRED', 'CANCELLED'],
      default: 'ACTIVE'
    }
  }, 
  { timestamps: true }
);

export const Insurance = mongoose.model('Insurance', insuranceSchema)