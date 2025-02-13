import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true
    },
    registrationHistory: [
        {
          previousOwner: { type: String, required: true },
          transferDate: { type: Date, required: true },
        },
    ],
    violationHistory: [{ type: String }],
    tollHistory: [{ type: String }],
    insuranceHistory: [{ type: String }]
//     eventType: {
//       type: String,
//       enum: ['OWNERSHIP_CHANGE', 'ACCIDENT', 'MAJOR_REPAIR', 'MODIFICATION'],
//       required: true
//     },
//     date: {
//       type: Date,
//       required: true
//     },
//     description: String,
//     documents: [String],
//     cost: Number,
//     location: String
//   },
    },
    { timestamps: true }
);

export const History = mongoose.model('History', historySchema)