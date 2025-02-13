import mongoose , { Schema } from "mongoose";

const vehicleSchema = new Schema(
    {
        platenumber: {
            type: String,
            required: true,
            unique: true
            // uppercase: true
        },
        manufacturer: String,
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        color: String,
        vehicleType: {
            type: String,
            enum: ['CAR', 'BIKE', 'TRUCK', 'BUS']
        },
        type: {
            type: String,
            enum: ['PRIVATE' , 'COMMERCIAL' , 'GOVERNMENT']
        },
        permit: {
            type: String,
            required: true
        },
        registrationDate: {
            type: Date,
            required: true
        },
        registrationExpiry: {
            type: Date,
            required: true
        },
        currentOwner: {
            type: String,
            ref: 'Owner'
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE', 'STOLEN'],
            default: 'ACTIVE'
        }
    },
    {timestamps: true}
)

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)