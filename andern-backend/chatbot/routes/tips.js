const { Router } = require("express")
const { getTips, getTip, getTipReplies, likeTip } = require("../controllers/tip.controller")

const router = Router()

router.get("/", getTips)
router.get("/:id", getTip)
router.patch("/:id", likeTip)

module.exports = router