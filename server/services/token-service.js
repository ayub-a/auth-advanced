import jwt from 'jsonwebtoken'
import TokenModel from '../models/token-model.js'
import tokenModel from '../models/token-model.js'


class TokenService {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }


    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await TokenModel.create({ user: userId, refreshToken })
        return token
    }


    async removeToken(refreshToken) {
        await TokenModel.deleteOne({ refreshToken })
    }


    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }


    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }


    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken })
        return tokenData
    }
    
}


export default new TokenService
