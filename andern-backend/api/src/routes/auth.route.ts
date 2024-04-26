import { Router } from "express";
import { getVerificationCode, login, verifyEmail } from "../controllers/auth.controller";

const router = Router()

router.post("/login", login)
router.post("/verify", getVerificationCode)
router.patch("/verify/callback", verifyEmail)

export default router;