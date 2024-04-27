import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import {rateLimit} from "express-rate-limit"
import http from "http"
import * as config from "./config/config"
import {connectDB} from "./config/db"
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import questionaireRouter from "./routes/questionaire.route"
import pharmacyRouter from "./routes/pharmacy.route"
import { useQueue } from "./libs/useQueue";
import { channels } from "./utils/enums";
import getAIDiag from "./helpers/get_ai_diag";
import handleInference from "./helpers/handle_ai_inference";

const app = express()

const limiter = rateLimit({
	windowMs: config.serverConfig.rateLimitMS,
	limit: config.serverConfig.rateLimitCount, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

useQueue(channels.GET_AI_DIAG, getAIDiag)
useQueue(channels.INFERENCE, handleInference)

app.use(limiter)
app.use(helmet())
app.use(cors({origin: process.env.CLIENT_URL || "*"}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/questionaires', questionaireRouter)
app.use("/api/v1/pharmacies", pharmacyRouter)

async function start(){
    const server = http.createServer(app)
    await connectDB()
    server.listen(config.serverConfig.port)
    server.on("listening", ()=>{
        console.log(`server running ${config.serverConfig.mode} mode on port ${(server.address() as {port: number}).port}...`)
    })
    return server
}

const server = start()

export default server