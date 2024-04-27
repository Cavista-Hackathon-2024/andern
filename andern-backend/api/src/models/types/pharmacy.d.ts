import { Address } from "cluster";
import { Document, ObjectId } from "mongoose";
import { CoordSchema, UserSchema, addressSchema } from "./user";

export interface PharmacySchema extends Document{
    name: string
    address: addressSchema
    coordinate: CoordSchema
    licenseId: string
    licenseVerified: boolean
    userId: ObjectId | UserSchema
}



