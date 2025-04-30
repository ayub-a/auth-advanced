import { Router } from 'express'
import userController from '../controllers/user-controller.js'

const router = new Router()

router.get('/users', userController.getUsers)

router
    .post('/registration', userController.registration)
    .post('/login', userController.login)
    .post('/logout', userController.logout)
    .post('/activate/:link', userController.activate)
    .post('/refresh', userController.refresh)


export default router
