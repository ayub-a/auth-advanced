import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";

import { AuthService } from "../services/AuthService";
import { API_URL } from "../http";

import { IAuthResponse } from "../models/response/IAuthResponse";
import { IUser } from "../models/IUser";


export class Store {

    user = {} as IUser
    isAuth = false
    isLoading = false
    error = ''

    constructor() {
        makeAutoObservable(this)
    }


    setAuth(bool: boolean) {
        this.isAuth = bool
    }


    setUser(user: IUser) {
        this.user = user
    }


    setLoading(bool: boolean) {
        this.isLoading = bool
    }


    setError(err: AxiosError<{ message: string }>) {
        console.log(err.response)
        this.error = err.response.data.message
    }


    async login(email:string, password: string) {
        try {
            this.setLoading(true)

            const response = await AuthService.login(email, password)

            localStorage.setItem('token', response.data.accessToken)

            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            this.setError(error)
        } finally {
            this.setLoading(false)
        }
    }


    async registration(email:string, password: string) {
        try {
            this.setLoading(true)

            const response = await AuthService.registration(email, password)

            localStorage.setItem('token', response.data.accessToken)

            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            this.setError(error)
        } finally {
            this.setLoading(false)
        }
    }


    async logout() {
        try {
            await AuthService.logout()

            localStorage.removeItem('token')

            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            this.setError(error)
        }
    }


    async checkAuth() {
        try {
            this.setLoading(true)

            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, { withCredentials: true })

            localStorage.setItem('token', response.data.accessToken)

            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            this.setError(error)
        } finally {
            this.setLoading(false)
        }
    }

}
