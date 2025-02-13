import { Router } from "express";
import { deleteOwner, getOwner, getVehicles, registerOwner, updateAddress, updateContacts } from "../controllers/owner.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/register").post(registerOwner)
router.route("/:licenseNumber").get(getOwner)
router.route("/updateContacts").patch(updateContacts)
router.route("/updateAddress").patch(updateAddress)
router.route("/veh/:licenseNumber").get(getVehicles)
router.route("/del/:licenseNumber").delete(deleteOwner)

export default router