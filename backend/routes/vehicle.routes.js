import { Router } from "express";
import { deleteVehicle, getInsuranceDetails, getOwnerDeatils, getTollRecords, getVehicle, getViolations, registerVehicle, updateCurrentOwner } from "../controllers/vehicle.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/register").post(registerVehicle)
router.route("/:platenumber").get(getVehicle)
router.route("/own/:licenseNumber").get(getOwnerDeatils)
router.route("/ins/:platenumber").get(getInsuranceDetails)
router.route("/toll/:platenumber").get(getTollRecords)
router.route("/violations/:platenumber").get(getViolations)
router.route("/updateOwner").patch(updateCurrentOwner)
router.route("/del/:platenumber").delete(deleteVehicle)

export default router