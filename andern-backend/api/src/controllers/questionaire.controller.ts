import catchAsyncErrors from "../libs/catchAsyncErrors";
import questionaireService from "../services/questionaire.service";
import questionaireValidator from "../services/validators/questionaire.validator";
import { UserTypes } from "../utils/enums";
import { ExtReq } from "../utils/types";
import { Response } from "express"

export const createQuestionaire = catchAsyncErrors(async(req: ExtReq, res: Response)=>{
    const validateRes = questionaireValidator.validateCreateQuestionairePayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const existing = await questionaireService.getUserQuestionaire(req.user._id.toString())
    if(existing)return res.status(400).json({message: 'questionnaire already exists for user.'})
    const questionaire = await questionaireService.createQuestionaire({...req.body, userId: req.user._id.toString()})
    return res.status(200).json(questionaire)
})

export const getQuestionaire = catchAsyncErrors(async(req: ExtReq, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "id is required"})
    if(id !== req.user._id.toString() && req.user.type !== UserTypes.PHARMACY)return res.status(403).json({message: "you are not authorized."})
    const target = await questionaireService.getUserQuestionaire(id)
    if(!target)return res.status(404).json({message: "user questionaire not found"})
    return res.status(200).json(target)
})

export const updateQuestionaire = catchAsyncErrors(async(req: ExtReq, res: Response)=>{
    const {id} = req.params
    if(id !== req.user._id.toString())return res.status(403).json({message: "you are not authorized."})
    const validateRes = questionaireValidator.validateUpdateQuestionPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const updated =  await questionaireService.updateQuestionaire(req.user._id.toString(), {...req.body, userId: req.user._id.toString()})
if(!updated)return res.status(404).json({message: "questionnaire not found"})
    return res.status(200).json(updated)
})