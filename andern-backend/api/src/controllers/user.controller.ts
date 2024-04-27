import { Request, Response } from "express";
import catchAsyncErrors from "../libs/catchAsyncErrors";
import userValidator from "../services/validators/user.validator";
import userService from "../services/user.service";

export const createUser = catchAsyncErrors(async(req: Request, res: Response)=>{
    const validateRes = userValidator.validateCreateUserPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const existing = await userService.getByEmail(req.body.email)
    if(existing)return res.status(400).json({message: "email is taken."})
    const user = await userService.create(req.body)
    return res.status(201).json({...user.toObject(), password: undefined})
})

export const getUser = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "id is required"})
    const target = await userService.getById(id)
    if(!target)return res.status(404).json({message: "user not found"})
    return res.status(200).json({...target.toObject(), password: undefined})
})

