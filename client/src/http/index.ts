import axios from "axios"
import { AuthService } from "../services/AuthService"

import { IAuthResponse } from "../models/response/IAuthResponse"

export const API_URL = 'http://localhost:3001/auth'


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})


$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest._isRetry = true

        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true })

            localStorage.setItem('token', response.data.accessToken)

            return $api.request(originalRequest)
        } catch (error) {
            console.log(error)

            await AuthService.logout()

            localStorage.removeItem('token')
            window.location.href = '/'
        }
    }

    throw error
})


export default $api
