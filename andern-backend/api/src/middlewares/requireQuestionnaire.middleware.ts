
import { Request, Response, NextFunction } from "express";
import { ExtReq } from "../utils/types";
import questionaireModel from "../models/questionaire.model";
import { UserTypes } from "../utils/enums";


export default async(req: Request, res: Response, next: NextFunction)=>{
    const {user} = req as ExtReq
    if(user.type === UserTypes.PHARMACY)return next()
    const questionaire = await questionaireModel.findOne({userId: user._id.toString()})
    if(!questionaire)return res.status(400).json({message: "Complete your questionnaire for access"})
        return next()
}