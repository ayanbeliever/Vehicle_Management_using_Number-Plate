import { Router } from "express";
import { createToll, updatePaymentStatus } from "../controllers/tollrecords.controller.js";

const router = Router()

router.route("/").post(createToll)
router.route("/updatePaymentStatus").patch(updatePaymentStatus)

export default router