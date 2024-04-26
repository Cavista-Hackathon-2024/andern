import catchAsyncErrors from "../libs/catchAsyncErrors";
import { Request, Response } from "express";
import userService from "../services/user.service";
import mailService from "../services/mail.service";
import otpService from "../services/otp.service";

export const login = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {email, password} = req.body

    if(!email || !password)return res.status(400).json({message: "email and password is required"})
    const user = await userService.getByEmail(email)
    const passwordCorrect = await user.comparePassword(password)
    if(!passwordCorrect)return res.status(400).json({message: "incorrect password"})
    if(!user.emailVerified){
        const otp = await otpService.create(email)
        await mailService.sendOtp(email, otp)
        return res.status(301).json({message: "confirm your email address."})
    }
    return res.status(200).json({user: {...user.toObject(), password: undefined}, token: await user.generateToken()})
})

export const getVerificationCode = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {email} = req.body
    if(!email)return res.status(400).json({message: "email is required"})
    const user = await userService.getByEmail(email)
    if(!user)return res.status(404).json({message: "email not found"})
    if(user.emailVerified)return res.status(400).json({message: "email already verified"})
    const otp = await otpService.create(email)
    await mailService.sendOtp(email, otp)
    return res.status(301).json({message: "confirm your email address."})
})

export const verifyEmail = catchAsyncErrors(async(req: Request, res: Response)=>{
    const {email, otp: value} = req.body
    if(!email || !value)return res.status(400).json({message: 'email and otp is required'})
    const target = await otpService.getByValue(value)
    if(!target || target.email !== email)return res.status(400).json({message: "invalid otp"})
    let user = await userService.getByEmail(email)
    if(!user)return res.status(404).json({message: "user not found"})
    user.emailVerified = true
    user = await user.save()
    return res.status(200).json({user: {...user.toObject(), password: undefined}, token: await user.generateToken()})
})

