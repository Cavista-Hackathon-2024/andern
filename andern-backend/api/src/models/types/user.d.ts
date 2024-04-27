import { Document } from "mongoose";

export interface UserSchema extends Document{
    email: string
    firstName: string
    lastName: string
    tel: string
    emailVerified: boolean
    type: string
    password: string
    address: Address
    coordinate: Coordinate
    comparePassword: (password: string)=>Promise<boolean>
    generateToken: ()=>Promise<string>
}

export interface Coordinate{
    lng: number
    lat: number
}

type CoordSchema = CoordSchema & Document


export interface Address{
    state: string
    country: string
    city: string
}

export type addressSchema = Address & Document