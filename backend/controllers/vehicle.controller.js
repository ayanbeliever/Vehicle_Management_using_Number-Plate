import { Owner } from "../models/owner.model.js";
import { Vehicle } from "../models/vehicle.model.js";

const registerVehicle = async (req, res) => {
    // const {platenumber, manufacturer, model, year, vehicleType} = req.body

    // if(
    //     [platenumber, manufacturer, model, year, vehicleType].some((field) => field?.trim() === "") 
    // ) {
    //     return res.status(400).json({success: false, message: "All fields are required"})
    // }

    // const existedVehicle = await Vehicle.findOne({platenumber})

    // if(existedVehicle) {
    //     return res.status(400).json({success:false, message: "Vehicle already exists"})
    // }

    // const vehicle = await Vehicle.create({
    //     platenumber,
    //     manufacturer,
    //     model,
    //     year,
    //     vehicleType
    // })

    // const vehicleCreated = await Vehicle.findById(vehicle._id)

    // if(!vehicleCreated) {
    //     return res.status(500).json({success: false, message: "Something went wrong while registration"})
    // }

    // return res.status(200).json({success:true, data: vehicleCreated})

    const vehicle = req.body

    if(!(vehicle.platenumber && vehicle.model && vehicle.manufacturer && vehicle.year && vehicle.vehicleType && vehicle.registrationDate&& vehicle.registrationExpiry && vehicle.currentOwner)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    const vehicleCreated = new Vehicle(vehicle)

    try {
        await vehicleCreated.save()
        return res.status(200).json({success: true , data: vehicleCreated})
    } catch (error) {
        console.log('Error : ' + error.message)
        return res.status(500).json({success: false , message: "Problem in registration"})
    }
}

const getVehicle = async (req, res) => {
    try {
        const { platenumber } = req.params
    
        const vehicle = await Vehicle.findOne({platenumber: platenumber.toUpperCase()})
    
        if(!vehicle) {
            return res.status(400).json({success: false , message: "Vehicle doesn't exist"})
        }
    
        return res.status(200).json({success: true, data: vehicle})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getOwnerDeatils = async (req, res) => {
    try {
        const {licenseNumber} = req.params
    
        const ownerDetails = await Vehicle.aggregate([
            {
                $match: {
                    currentOwner: licenseNumber
                }
            },
            {
                $lookup: {
                    from: "owners",
                    localField: "currentOwner",
                    foreignField: "licenseNumber",
                    as: "owner"
                }
            },
            {
                $unwind: "$owner"
            }
            // {
            //     $project: {
            //         "owner": 1
            //     }
            // }
        ])

        console.log(ownerDetails[0])
    
        return res
        .status(200)
        .json({success: true , data: ownerDetails[0].owner})
    } catch (error) {
        return res
        .status(403)
        .json({success: false , message: "Owner with the License number doesn't exist"})
    }
}

const updateCurrentOwner = async (req , res) => {
    const { platenumber , newOwner } = req.body

    if(!(platenumber && newOwner)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    const owner = await Owner.findOne({licenseNumber: newOwner})
    if(!owner) {
        return res.status(404).json({success: false , message: "Owner not found"})
    }

    const vehicle = await Vehicle.updateOne(
        {platenumber: platenumber},
        {$set : {currentOwner: newOwner}}
    )

    if(!vehicle.matchedCount) {
        return res.status(404).json({success: false , message: "Vehicle not found"})
    }


    return res
    .status(200)
    .json({success: true , data: vehicle , message: "Owner of Vehicle updated successfully"})
}

const getInsuranceDetails = async (req , res) => {
    try {
        const {platenumber} = req.params

        const vehicleExists = await Vehicle.findOne({platenumber: platenumber})

        if(!vehicleExists) {
            return res.status(404).json({success: false , message: "Vehicle not found"})
        }

        const insurance = await Vehicle.aggregate([
            {
                $match: {
                    platenumber: platenumber
                }
            },
            {
                $lookup: {
                    from: "insurances",
                    localField: "platenumber",
                    foreignField: "vehicle",
                    as: "insuranceDetails"
                }
            },
            {
                $unwind: "$insuranceDetails"
            }
        ])

        if(!(insurance[0]?.insuranceDetails)) {
            return res
            .status(400)
            .json({success: false , data: null, message: "Insurance doesn't exist for this vehicle"})
        }

        return res
        .status(200)
        .json({success: true , data : insurance[0].insuranceDetails})
    } catch (error) {
        return res
        .status(500)
        .json({success: false , message: "Internal Server Error"})
    }
}

const getTollRecords = async (req , res) => {
    try {
        const {platenumber} = req.params

        const vehicleExists = await Vehicle.findOne({platenumber: platenumber})

        if(!vehicleExists) {
            return res.status(404).json({success: false , message: "Vehicle not found"})
        }

        const tollRecords = await Vehicle.aggregate([
            {
                $match: {
                    platenumber: platenumber
                }
            },
            {
                $lookup: {
                    from: "tollrecords",
                    localField: "platenumber",
                    foreignField: "vehicle",
                    as: "tollRecords"
                }
            }
        ])

        if(!(tollRecords[0]?.tollRecords?.length)) {
            return res
            .status(200)
            .json({success: true , data: null})
        }

        return res
        .status(200)
        .json({success: true , data : tollRecords[0].tollRecords})
    } catch (error) {
        return res
        .status(500)
        .json({success: false , message: "Internal Server Error"})
    }
}

const getViolations = async (req, res) => {
    try {
        const {platenumber} = req.params

        const vehicleExists = await Vehicle.findOne({platenumber: platenumber})

        if(!vehicleExists) {
            return res.status(404).json({success: false , message: "Vehicle not found"})
        }

        const violation = await Vehicle.aggregate([
            {
                $match: {
                    platenumber: platenumber
                }
            },
            {
                $lookup: {
                    from: "violations",
                    localField: "platenumber",
                    foreignField: "vehicle",
                    as: "violations"
                }
            }
        ])

        if(!(violation[0]?.violations?.length)) {
            return res
            .status(200)
            .json({success: true , data: null})
        }

        return res
        .status(200)
        .json({success: true , data: violation[0].violations})
    } catch (error) {
        return res
        .status(500)
        .json({success: false , message: "Internal Server Error"})
    }
}

const deleteVehicle = async (req , res) => {
    const { platenumber } = req.params

    const vehicle = await Vehicle.findOne({platenumber: platenumber})

    if(!vehicle) {
        return res.status(404).json({success: false , message: "Vehicle not found"})
    }

    const vehicleDeleted = await Vehicle.deleteOne(
        {platenumber: platenumber}
    )

    return res
    .status(200)
    .json({success: true , data: vehicleDeleted, message: "Vehicle Deleted Successfully"})
}

export {
    registerVehicle,
    getVehicle,
    getOwnerDeatils,
    getInsuranceDetails,
    getTollRecords,
    getViolations,
    updateCurrentOwner,
    deleteVehicle
}