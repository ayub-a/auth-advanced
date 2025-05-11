import { config } from 'dotenv'
config()

import bcrypt from 'bcrypt'
import * as uuid from 'uuid'

import UserModel from '../models/user-model.js'
import UserDTO from '../dtos/user-dto.js'
import ApiError from '../exceptions/api-error.js'

import mailService from './mail-service.js'
import tokenService from './token-service.js'


class UserService {

    async registration(email, password) {
        const isEmailExist = await UserModel.findOne({ email })
        if (isEmailExist) throw ApiError.BadRequest('email already exist')
            
        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({ email, password: hashedPassword, activationLink })

        await mailService.sendMailActivation(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }


    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })

        if (!user) throw ApiError.BadRequest('invalid activate link')

        user.isActivated = true

        await user.save()
    }


    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) throw ApiError.BadRequest('wrong email or password')

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) throw ApiError.BadRequest('wrong email or password')
        
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }


    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken)
    }


    async refreshToken(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthError()

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) throw ApiError.UnauthError()
        
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }


    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
    
}


export default new UserService
