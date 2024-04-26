import mongoose from "mongoose"

import { dbConfig } from "./config"


export const connectDB = ()=>{
    return mongoose.connect(dbConfig.uri!)
    .then(()=>{
        console.log("connected to db...")
    })
}