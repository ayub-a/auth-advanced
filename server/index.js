import express from 'express'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server is running on PORT = ${PORT}`))
    } catch (error) {
        console.log(error.message)
    }
}

start()
