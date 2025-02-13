import { Violation } from "../models/violation.model.js";

const putFine = async (req , res) => {
    const { vehicle , violationType , date , location , fineAmount , status} = req.body

    if(!(vehicle && violationType && date && location && fineAmount && status)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    const violation = await Violation.create({
        vehicle,
        violationType,
        date,
        location,
        fineAmount,
        status
    })

    if(!violation) {
        return res.status(500).json({success: false , message: "Error while registration"})
    }

    return res
    .status(200)
    .json({success: true , data: violation})
}

const updatePaymentStatus = async (req , res) => {
    const { platenumber , status } = req.body

    if(!(platenumber && status)) {
        res.status(400).json({success: false , message :"All fields are required"})
    }

    try {
        const violation = await Violation.updateOne(
            { vehicle: platenumber },
            {$set : {status: status}}
        )

        return res
        .status(200)
        .json({success: true, data: violation , message: "Payment Status Updated Successfully" })
    } catch (error) {
        console.log('Error : ' + error.message)
        res.status(500).json({success: false , message :"Cannot Update the Payment Status"})
    }
}

const changeViolationType = async (req, res) => {
    const { platenumber , violationType } = req.body

    if(!(platenumber && violationType)) {
        res.status(400).json({success: false , message :"All fields are required"})
    }

    try {
        const violation = await Violation.updateOne(
            { vehicle: platenumber },
            {$set : {violationType: violationType}}
        )

        return res
        .status(200)
        .json({success: true, data: violation , message: "Violation Type Updated Successfully" })
    } catch (error) {
        console.log('Error : ' + error.message)
        res.status(500).json({success: false , message :"Cannot Update the Violation Type"})
    }
}

export {
    putFine,
    updatePaymentStatus,
    changeViolationType
}