import { Router } from "express";
import { changeViolationType, putFine, updatePaymentStatus } from "../controllers/violation.controller.js";

const router = Router()

router.route("/").post(putFine)
router.route("/updatePaymentStatus").patch(updatePaymentStatus)
router.route("/changeViolationType").patch(changeViolationType)

export default router