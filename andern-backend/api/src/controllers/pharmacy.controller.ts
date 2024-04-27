import { Request, Response } from "express";
import { ExtReq } from "../utils/types";
import pharmacyValidator from "../services/validators/pharmacy.validator";
import pharmacyService from "../services/pharmacy.service";
import pharmacyModel from "../models/pharmacy.model";

export const createPharmacy = async(req: Request, res: Response)=>{
    const {user} = req as ExtReq
    const validateRes = pharmacyValidator.validateCreatePharmacyPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
        const pharmacy = await pharmacyService.create({...req.body, licenseVerified: true, userId: user._id.toString()})
    return res.status(201).json(pharmacy)
}

export const getPharmacies = async(req: Request, res: Response)=>{
    const {userId} = req.query
    if(userId){
        const data = await pharmacyModel.find({userId})
        return res.status(200).json(data)
    }else{
        const data = await pharmacyModel.find()
        return res.status(200).json(data)
    }
}

export const getPharmacy = async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id) return res.status(400).json({message: "id is required"})
    const pharmacy = await pharmacyService.getById(id)
    if(!pharmacy)return res.status(404).json({message: 'pharmacy not found'})
        return res.status(200).json(pharmacy)
}

export const updatePharmacy = async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id) return res.status(400).json({message: "id is required"})
    const {user} = req as ExtReq
    const target = await pharmacyService.getById(id)
    if(!target)return res.status(404).json({message: "Pharmacy not found"})
    if(user._id.toString() !== target.userId.toString())return res.status(403).json({message: "you are not authorized"})
    const validateRes = pharmacyValidator.validateUpdatePharmacyPayload(req.body)
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const pharmacy = await pharmacyService.update(id, req.body)
    return res.status(200).json(pharmacy)
}

