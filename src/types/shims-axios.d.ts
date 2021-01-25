import { AxiosRequestConfig } from 'axios'
declare module 'axios' {
    export interface AxiosInstance {
        request<T = any, R = ResponseData<T>>(config: AxiosRequestConfig): Promise<R>
        get<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        delete<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        head<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        options<T = any, R = ResponseData<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
        post<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
        put<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
        patch<T = any, R = ResponseData<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
    }
}
