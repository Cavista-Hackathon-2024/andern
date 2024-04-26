import { Router } from "express";
import { createQuestionaire, getQuestionaire, updateQuestionaire } from "../controllers/questionaire.controller";
import { useAuth } from "../middlewares/auth.middleware";

const router = Router()

router.post("/", useAuth, createQuestionaire)
router.get("/:id", useAuth, getQuestionaire)
router.put('/:id', useAuth, updateQuestionaire)

export default router