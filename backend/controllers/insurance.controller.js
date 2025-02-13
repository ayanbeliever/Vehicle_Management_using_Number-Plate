import { Insurance } from "../models/insurance.model.js";

const createVehicleInsuranceDoc = async (req , res) => {
    const details = req.body

    if(!(details.vehicle && details.policyNumber && details.provider && details.type && details.startDate && details.endDate && details.status)) {
        res.status(400).json({success: false , message :"All fields are required"})
    }

    const insuranceDetails = new Insurance(details)

    try {
        await insuranceDetails.save()
        return res
        .status(200)
        .json({success: true , data: insuranceDetails})
    } catch (error) {
        console.log('Error : ' + error.message)
        return res.status(500).json({success: false , message: "Error while registration"})
    }
}

const updateStatus = async (req , res) => {
    const { policyNumber , status } = req.body

    if(!(policyNumber && status)) {
        res.status(400).json({success: false , message :"All fields are required"})
    }

    try {
        const insurance = await Insurance.updateOne(
            {policyNumber: policyNumber},
            {$set : {status: status}}
        )

        if(!insurance.modifiedCount) {
            return res
            .status(400)
            .json({success: true, message: "Insurance with policyNumber doesn't exist" })
        }

        return res
        .status(200)
        .json({success: true, data: insurance , message: "Current Status Updated Successfully" })
    } catch (error) {
        console.log('Error : ' + error.message)
            res.status(500).json({success: false , message :"Cannot Update the Status"})
    }
}

const deleteInsurance = async (req , res) => {
    const {policyNumber} = req.params

    const insuranceDocument = await Insurance.findOne({policyNumber: policyNumber})

    if(!insuranceDocument) {
        return res.status(404).json({success: false , message: "Inrance document not found"})
    }

    const deletedInsurance = await Insurance.deleteOne(
        { policyNumber: policyNumber}
    )

    return res
    .status(200)
    .json({success: true , data: deletedInsurance, message: "Insurance Deleted Successfully"})
}

const deleteExpiredInsurances = async (req , res) => {
    const deletedInsurances = await Insurance.deleteMany(
        { status : 'EXPIRED'}
    )

    return res
    .status(200)
    .json({success: true , data: deletedInsurances, message: "Expired insurances Deleted Successfully"})

}

export {
    createVehicleInsuranceDoc,
    updateStatus,
    deleteInsurance,
    deleteExpiredInsurances
}