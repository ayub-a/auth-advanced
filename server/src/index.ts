import { config } from 'dotenv'
config()

import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth'
import errorMiddleware from './middlewares/error.middleware'


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/auth', authRouter)

app.use(errorMiddleware)


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string)
        app.listen(PORT, () => console.log(`Server is running on PORT = ${PORT}`))
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log('unknown error')
        }
    }
}

start()
