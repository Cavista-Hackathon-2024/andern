import { Document } from "mongoose";

export interface OtpSchema extends Document{
    value: string
    expireAt: number
    email: string
}