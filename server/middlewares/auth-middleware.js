import ApiError from "../exceptions/api-error.js"
import tokenService from "../services/token-service.js"


function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) return next(ApiError.UnauthError())

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) return next(ApiError.UnauthError())

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) return next(ApiError.UnauthError())

        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnauthError())
    }
}


export default authMiddleware
