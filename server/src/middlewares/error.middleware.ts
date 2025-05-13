import { NextFunction, Request, Response } from "express"
import ApiError from "../exceptions/api.error"


function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err)

    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message, errors: err.errors })
        return
    }

    res.status(500).json({ message: 'something went wrong', error: err.message })
    return
}


export default errorMiddleware
