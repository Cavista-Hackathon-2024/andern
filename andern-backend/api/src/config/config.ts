import dotenv from "dotenv"

dotenv.config()

export const serverConfig = {
    port: process.env.SERVER_PORT || 8001,
    rateLimitMS: (process.env.SERVER_RATE_LIMIT_TIME?+process.env.SERVER_RATE_LIMIT_TIME:15) * 60 * 1000,
    rateLimitCount: process.env.SERVER_RATE_LIMIT_COUNT?+process.env.SERVER_RATE_LIMIT_COUNT: 100,
    mode: process.env.NODE_ENV || "development",
    secret: process.env.SERVER_SECRET,
    otpTimestamp: process.env.OTP_TIMESTAMP?+ process.env.OTP_TIMESTAMP: 30 //in minutes
}

export const dbConfig = {
    uri: process.env.DB_URI
}

export const services = {
    mailConfig: {
        port: process.env.MAIL_PORT!,
        service: process.env.MAIL_SERVICE!,
        host: process.env.MAIL_HOST!,
        auth: {
            pass: process.env.MAIL_PASS!,
            user: process.env.MAIL_USER!
        },
        address: process.env.MAIL_ADDRESS!
    },
    amqp: {uri: process.env.AMQP_URI || "amqp://localhost"}
}