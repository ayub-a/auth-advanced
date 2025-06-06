import { Router } from 'express'
import { body } from 'express-validator'

import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/auth.middleware'


const router = Router()

router
    .post(
        '/registration',
        body('email').isEmail(),
        body('password').isLength({ min: 3, max: 28 }),
        userController.registration
    )

    .post('/login', userController.login)
    .post('/logout', userController.logout)
    .get('/refresh', userController.refresh)
    .get('/activate/:link', userController.activate)
    .get('/users', authMiddleware, userController.getAllUsers)


export default router
