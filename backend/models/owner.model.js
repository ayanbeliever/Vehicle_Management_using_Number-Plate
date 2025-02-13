import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    dateOfBirth: Date,
    licenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    phone: String,
    email: String,
    address: {
      type: String,
      required: true
    },
    vehicles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    }]
  }, 
  { timestamps: true }
);

export const Owner = mongoose.model('Owner', ownerSchema)