import nodemailer, { TransportOptions } from "nodemailer";
import ejs from "ejs";
import path from "path";
import * as config from '../config/config'
import { TemplateNames } from "../utils/enums";
import { OtpSchema } from "../models/types/otp";

class Mailer{

    constructor(
        private transport = nodemailer.createTransport({
            ...config.services.mailConfig
        } as TransportOptions),

    ){ }
    private sendMail = async (to: string, data: object, templateName: TemplateNames)=>{
        try{
        const templatePath = path.resolve(__dirname, "../templates/"+ templateName + ".ejs")
        const template = await ejs.renderFile(templatePath, data)
        await this.transport.sendMail({to, html: template})
        }catch(ex){
            console.log("error sending mail>> ", ex)
            throw(ex)
        }
    }

    async sendOtp(email: string, otp: OtpSchema){
        return this.sendMail(email, {otp: otp.value}, TemplateNames.OTP)
    }


}

export default Object.freeze(new Mailer())