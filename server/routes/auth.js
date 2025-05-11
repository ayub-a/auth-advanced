import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js'

const router = new Router()

router
    .post(
        '/registration',
        body('email').isEmail(),
        body('password').isLength({ min: 3, max: 28 }),
        userController.registration
    )

    .post('/login', userController.login)
    .post('/logout', userController.logout)
    .post('/refresh', userController.refresh)
    .get('/activate/:link', userController.activate)
    .get('/users', authMiddleware, userController.getAllUsers)


export default router
