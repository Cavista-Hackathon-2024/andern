import { Model } from "mongoose";
import { UserSchema } from "../models/types/user";
import UserModel from "../models/user.model";


class UserService{
    constructor(
        private userModel: Model<UserSchema> = UserModel
    ){}

    create(obj: object){
        return this.userModel.create({...obj})
    }

    async getByEmail(email: string){
        const res = await this.userModel.find({email})
        return res[0]
    }

    async getById(id: string){
        return this.userModel.findById(id)
    }


}

const userService = new UserService()

export default Object.freeze(userService)