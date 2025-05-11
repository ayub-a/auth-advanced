import { config } from 'dotenv'
config()

import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routes/auth.js'
import errorMiddleware from './middlewares/error-middleware.js'


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
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server is running on PORT = ${PORT}`))
    } catch (error) {
        console.log(error.message)
    }
}

start()
