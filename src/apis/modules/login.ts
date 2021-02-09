import request from '../request'

interface LoginModel {
    username: string
    password: string
}

export const login = (data: LoginModel) => request.post('login', data)
