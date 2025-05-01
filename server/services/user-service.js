import bcrypt from 'bcrypt'
import * as uuid from 'uuid'

import UserModel from '../models/user-model.js'
import UserDTO from '../dtos/user-dto.js'

import mailService from './mail-service.js'
import tokenService from './token-service.js'


class UserService {

    async registration(email, password) {
        const isEmailExist = await UserModel.findOne({ email })
        if (isEmailExist) throw new Error('email already exist')
            
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

        if (!user) throw new Error('invalid activate link')

        user.isActivated = true

        await user.save()
    }
    
}


export default new UserService
