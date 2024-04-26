import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config/config";
import userModel from "../models/user.model";
import otpService from "../services/otp.service";
import mailService from "../services/mail.service";
import { UserSchema } from "../models/types/user";

interface ExtReq extends Request{
    user: UserSchema
}

export const useAuth = async(req: Request, res: Response, next: NextFunction) =>{
    function sendUnauthenticated(message: string = "unauthenticated"){
        return res.status(401).json({message})
    }
    const h = req.headers.authorization
    if(!h)return sendUnauthenticated('provide bearer token')
    const [prefix, token] = h.split(" ")
    if(prefix.toLowerCase() !== "bearer")return sendUnauthenticated("token must be of type bearer")
    const {id } = await jwt.verify(token, serverConfig.secret!) as {id: string, type: string}
    if(!id)return sendUnauthenticated("invalid token")
    const user = await userModel.findById(id)
    if(!user)return res.status(404).json({message: "user not found"})
    if(!user.emailVerified){
        const otp = await otpService.create(user.email)
        await mailService.sendOtp(user.email, otp)
        return res.status(301).json({message: "confirm your email address."})
    };
    (req as ExtReq).user = user
    next()
}