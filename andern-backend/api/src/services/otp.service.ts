import OtpModel from "../models/otp.model";
import { OtpSchema } from "../models/types/otp";
import { Model } from "mongoose";
import { generateRandom } from "../utils/factory";
import { serverConfig } from "../config/config";

class OtpService{
    constructor(
        private otpModel: Model<OtpSchema> = OtpModel
    ){}

    async create(email: string){
        const rand = generateRandom(6)
        const existing = await this.getByValue(rand)
        if(existing){
            if(Date.now()>=existing.expireAt){
                await existing.deleteOne()
                this.create(email)
            }
            this.create(email)
        }
        const otp = this.otpModel.create({email, value: rand})
        return otp
    }

    async getByValue(value: string){
        return this.otpModel.findOne({value})
    }
}

export default Object.freeze(new OtpService())