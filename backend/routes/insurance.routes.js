import { Router } from "express";
import { createVehicleInsuranceDoc, deleteExpiredInsurances, deleteInsurance, updateStatus } from "../controllers/insurance.controller.js";

const router = Router()

router.route("/create").post(createVehicleInsuranceDoc)
router.route("/updateStatus").patch(updateStatus)
router.route("/deleteInsurance/:policyNumber").delete(deleteInsurance)
router.route("/deleteExpiredInsurances").delete(deleteExpiredInsurances)

export default router