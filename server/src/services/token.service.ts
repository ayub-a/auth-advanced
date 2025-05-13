import { config } from 'dotenv'
config()

import jwt from 'jsonwebtoken'
import TokenModel from '../models/token.model'


interface ITokenPayload {
    id: string,
    email: string,
    isActivated: boolean
}


interface IJwtPayload {
    id: string
    email: string
    isActivated: boolean
}


class TokenService {

    generateTokens(payload: ITokenPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '1d' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }


    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await TokenModel.create({ user: userId, refreshToken })
        return token
    }


    async removeToken(refreshToken: string) {
        await TokenModel.deleteOne({ refreshToken })
    }


    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
            return userData as IJwtPayload
        } catch (error) {
            return null
        }
    }


    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
            return userData as IJwtPayload
        } catch (error) {
            return null
        }
    }


    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData
    }
    
}


export default new TokenService
