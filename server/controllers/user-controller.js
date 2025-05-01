import userService from "../services/user-service.js"
import { config } from 'dotenv'
config()

class UserController {

    static _errorHandler(res, error, statusCode = 500) {
        return res.status(statusCode).json(error.message)
    }


    async getUsers(req, res) {
        try {

        } catch(error) {
            UserController._errorHandler(res, error )
        }
    }


    async registration(req, res) {
        try {
            const { email, password } = req.body

            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 3600 * 24 * 30, secure: true })
            res.json(userData)
        } catch(error) {    
            UserController._errorHandler(res, error)
        }
    }   
    
    
    async login(req, res) {
        try {

        } catch(error) {
            UserController._errorHandler(res, error )
        }
    }   


    async logout(req, res) {
        try {

        } catch(error) {
            UserController._errorHandler(res, error )
        }
    }   


    async activate(req, res) {
        try {
            const activationLink = req.params.link

            await userService.activate(activationLink)

            res.redirect(process.env.CLIENT_URL)
        } catch(error) {
            UserController._errorHandler(res, error )
        }
    }   


    async refresh(req, res) {
        try {

        } catch(error) {
            UserController._errorHandler(res, error )
        }
    }   

}


export default new UserController()
