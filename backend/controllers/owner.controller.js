import mongoose, { isValidObjectId } from "mongoose";
import { Owner } from "../models/owner.model.js";

const registerOwner = async (req, res) => {
    const owner = req.body
    // if(
    //     [owner.name , owner.licenseNumber, owner.phone, owner.email, owner.address].some((field) => field?.trim() === "")
    // ) {
    //     return res.status(400).json({success: false , message: "All fields are required"})
    // }

    if(!(owner.name && owner.licenseNumber && owner.phone && owner.email && owner.address)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    // if(!(owner.contact.phone && owner.contact.email && owner.contact.address)) {
    //     return res.status(400).json({success: false , message: "All fields are required"})
    // }

    const createOwner = new Owner(owner)

    try {
        await createOwner.save()
        return res.status(200).json({success: true , data: createOwner})
    } catch (error) {
        return res.status(500).json({success: false , message: error.message})
    }
}

const getOwner = async (req , res) => {
    const { licenseNumber } = req.params

    if(!licenseNumber) {
        return res.status(400).json({success: false , message: "license number is required"})
    }

    const owner = await Owner.findOne({licenseNumber: licenseNumber})

    if(!owner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    return res.status(200).json({success: true , data: owner})
}

const getVehicles = async (req, res) => {
    // const {currentOwner} = req.body

    // if(!isValidObjectId(currentOwner)) {
    //     return res.status(400).json({success: false , message: "Invalid owner id"})
    // }

    // const owner = await Owner.findById(currentOwnert)
    // if(!owner) {
    //     return res.status(404).json({success: false , message: "Owner not found"})
    // }

    // const vehicles = await Owner.aggregate([
    //     {
    //         $match: {_id : new mongoose.Types.ObjectId(currentOwner)}
    //     },
    //     {
    //         $lookup: {
    //             from: "vehicles",
    //             localField: "_id",
    //             foreignField: "currentOwner",
    //             as: "allVehicles"
    //         }
    //     }
    // ])

    try {
        const {licenseNumber} = req.params
        console.log(licenseNumber)
        console.log(typeof(licenseNumber))
    
        if(!(licenseNumber)) {
            return res.status(400).json({success: false , message: "Field is required"})
        }
    
        const vehicles = await Owner.aggregate([
            {
                $match: {
                  licenseNumber: licenseNumber
                }
            },
            {
                $lookup: {
                  from: "vehicles",
                  localField: "licenseNumber",
                  foreignField: "currentOwner",
                  as: "vehicles"
                }
            }
        ])

        console.log(vehicles[0])

        if(!(vehicles[0]?.vehicles?.length)) {
            return res.status(200).json({success: true , data: null , message: "Owner has no owned vehicles"})
        }
        
        return res.status(200).json({success: true , data : vehicles[0].vehicles})
    } catch (error) {
        return res.status(500).json({success: false , message: "Internal Server Error"})
    }
}

const updateContacts = async (req , res) => {
    const { licenseNumber , phone , email } = req.body
    if(!(licenseNumber && phone && email)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    const owner = await Owner.findOne({licenseNumber: licenseNumber})

    if(!owner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    const updatedOwner = await Owner.updateOne(
        {licenseNumber: licenseNumber},
        {$set: {
            phone: phone,
            email: email
        }}
    )

    if(!updatedOwner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    return res
    .status(200)
    .json({success: true , data: updatedOwner , message: "Owner Contacts updated successfully"})
}

const updateAddress = async (req , res) => {
    const { licenseNumber , address } = req.body
    if(!(licenseNumber && address)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    const owner = await Owner.findOne({licenseNumber: licenseNumber})

    if(!owner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    const updatedOwner = await Owner.updateOne(
        {licenseNumber: licenseNumber},
        {$set: {address: address}}
    )

    if(!updatedOwner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    return res
    .status(200)
    .json({success: true , data: updatedOwner , message: "Owner Address updated successfully"})
}

const deleteOwner = async (req , res) => {
    const {licenseNumber} = req.params

    const owner = await Owner.findOne({licenseNumber: licenseNumber})

    if(!owner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    const deletedOwner = await Owner.deleteOne(
        {licenseNumber: licenseNumber}
    )

    return res
    .status(200)
    .json({success: true , data: deletedOwner , message: "Owner deleted successfully"})
}

export {
    registerOwner,
    getOwner,
    updateContacts,
    updateAddress,
    getVehicles,
    deleteOwner
}