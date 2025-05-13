import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"

import ApiError from "../exceptions/api.error"
import tokenService from "../services/token.service"


interface IRequestMidllware extends Request {
    user: JwtPayload | string
}


function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            next(ApiError.UnauthError())
            return
        }


        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            next(ApiError.UnauthError())
            return
        }


        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            next(ApiError.UnauthError())
            return
        }

        (req as IRequestMidllware).user = userData
        next()
    } catch (error) {
        next(ApiError.UnauthError())
        return
    }
}


export default authMiddleware
