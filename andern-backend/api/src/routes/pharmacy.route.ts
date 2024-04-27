import { Router } from "express"
import { restrictRouteTo, useAuth } from "../middlewares/auth.middleware"
import { UserTypes } from "../utils/enums"
import { createPharmacy, getPharmacies, getPharmacy, updatePharmacy } from "../controllers/pharmacy.controller"
import requireQuestionnaireMiddleware from "../middlewares/requireQuestionnaire.middleware"

const router = Router()

router.post("/", useAuth, restrictRouteTo(UserTypes.PHARMACY), createPharmacy)
router.get("/", useAuth, requireQuestionnaireMiddleware, getPharmacies)
router.get("/:id", useAuth, requireQuestionnaireMiddleware, getPharmacy)
router.put("/:id", useAuth,restrictRouteTo(UserTypes.PHARMACY), updatePharmacy)

export default router