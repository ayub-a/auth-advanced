import { Router } from 'express'
import userController from '../controllers/user-controller.js'

const router = new Router()

router
    .post('/registration', userController.registration)
    .post('/login', userController.login)
    .post('/logout', userController.logout)
    .post('/refresh', userController.refresh)
    .get('/activate/:link', userController.activate)
    .get('/users', userController.getUsers)


export default router
