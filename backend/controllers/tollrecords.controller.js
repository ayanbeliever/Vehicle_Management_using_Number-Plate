import { TollRecord } from "../models/tollrecords.model.js";

const createToll = async (req , res) => {
    const { vehicle , tollBoothId , amount , paymentStatus , paymentMethod } = req.body

    if(!(vehicle && tollBoothId && amount && paymentStatus)) {
        return res.status(400).json({success: false , message: "All fields are required"})
    }

    try {
        const tollRecord = await TollRecord.create ({
            vehicle,
            tollBoothId,
            passageTime: new Date(),
            amount,
            paymentStatus,
            paymentMethod
        })

        if(!tollRecord) {
            return res.status(400).json({success: false , message: "Provide Correct Data"})
        }

        return res
        .status(200)
        .json({success: true , data: tollRecord})
    } catch (error) {
        console.log('Error : ' + error.message)
        return res.status(500).json({success: false , message: "Error while registration"})
    }
}

const updatePaymentStatus = async (req , res) => {
    const { platenumber , paymentStatus } = req.body
    
        if(!(platenumber && paymentStatus)) {
            res.status(400).json({success: false , message :"All fields are required"})
        }
    
        try {
            const tollrecord = await TollRecord.updateOne(
                { vehicle: platenumber },
                {$set : {paymentStatus: paymentStatus}}
            )
    
            return res
            .status(200)
            .json({success: true, data: tollrecord , message: "Payment Status Updated Successfully" })
        } catch (error) {
            console.log('Error : ' + error.message)
            res.status(500).json({success: false , message :"Cannot Update the Payment Status"})
        }
}

export {
    createToll,
    updatePaymentStatus
}