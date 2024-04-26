import { Request } from "express"

export interface ExtReq extends Request{
    user: UserSchema
}