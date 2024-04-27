import { required } from "joi";
import mongoose from "mongoose";
import { serverConfig } from "../config/config";
import { OtpSchema } from "./types/otp";

const otpSchema = new mongoose.Schema<OtpSchema>({
    value: { type: String, required: true},
    expireAt: {type: Number, required: true, default: Date.now() + (serverConfig.otpTimestamp * 1000 * 60)},
    email: {type: String, required: true}
})

export default mongoose.model("otp", otpSchema)