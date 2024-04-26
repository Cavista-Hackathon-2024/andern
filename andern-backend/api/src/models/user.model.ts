import mongoose from 'mongoose';
import { UserSchema } from './types/user';
import { UserTypes } from '../utils/enums';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { serverConfig } from '../config/config';

const userSchema = new mongoose.Schema<UserSchema>({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    type: {type: String, required: true, enum: Object.values(UserTypes), message: `user type must be ${Object.values(UserTypes).join(", ")}`},
    emailVerified: {type: Boolean, default: false},
    password: {type: String, required: true, minlength: 6},
    address: {
        type: {
            state: { type: String, required: true},
            city: {type: String, required: true},
            country: {type: String, required: true}
        }
    },
    coordinate: {
        type: {
            lng: {type: Number, required: true},
            lat: {type: Number, required: true}
        }
    }

}, {timestamps: true})

userSchema.pre("save", async function(){
    if(this.isNew || this.isModified("password")){
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(this.password, salt)
        this.password = hashed
    }
})

userSchema.methods.comparePassword = function(password: string){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function(){
    const obj = {id: this._id.toString(), type: this.type}
    return jwt.sign(obj, serverConfig.secret!, {expiresIn: process.env.JWT_TIMESPAN || "2d"})
}

const userModel = mongoose.model("user", userSchema)

export default userModel