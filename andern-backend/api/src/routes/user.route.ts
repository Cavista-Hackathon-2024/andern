import { Router } from "express";
import { register } from "module";
import { createUser, getUser } from "../controllers/user.controller";
import { useAuth } from "../middlewares/auth.middleware";
import validateIdMiddleware from "../middlewares/validateId.middleware";

const router = Router()

router.post("/", createUser)
router.get("/:id", useAuth, validateIdMiddleware, getUser)

export default router