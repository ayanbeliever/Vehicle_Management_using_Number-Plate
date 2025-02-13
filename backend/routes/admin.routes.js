import { Router } from "express";
import { loginAdmin, logoutAdmin, registerAdmin, updateEmail, updatePassword } from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)

router.route("/logout").post(adminAuth, logoutAdmin)
router.route("/updateEmail").patch(adminAuth, updateEmail)
router.route("/updatePassword").patch(adminAuth, updatePassword)

export default router