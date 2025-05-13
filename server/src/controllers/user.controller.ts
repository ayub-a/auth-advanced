import { config } from 'dotenv'
config()

import { NextFunction, Request, Response } from 'express'
import { validationResult } from "express-validator"

import userService from "../services/user.service"
import ApiError from "../exceptions/api.error"


class UserController {

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers()
            res.json(users)
        } catch(error) {
            next(error)
        }
    }


    async registration(req: Request, res: Response, next: NextFunction) {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('validation issue', errors.array()))
            }

            const { email, password } = req.body

            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30, secure: true })
            res.json(userData)
        } catch(error) {    
            next(error)
        }
    }   
    
    
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30, secure: true })
            res.json(userData)
        } catch(error) {
            next(error)
        }
    }   


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            await userService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.status(200).json()
        } catch(error) {
            next(error)
        }
    }   


    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            res.redirect(process.env.CLIENT_URL as string)
        } catch(error) {
            next(error)
        }
    }   


    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies

            const tokenData = await userService.refreshToken(refreshToken)

            res.cookie('refreshToken', tokenData.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30, secure: true })
            res.json(tokenData)
        } catch(error) {
            next(error)
        }
    }   

}


export default new UserController()
