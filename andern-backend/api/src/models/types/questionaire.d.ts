import { Document, ObjectId } from "mongoose";
import { Address, UserSchema } from "./user";

export interface QuestionaireSchema extends Document{
    userId: ObjectId | UserSchema
    genotype: string
    bloodGroup: string
    gender: string
    dob: string
    bmi: string
}


