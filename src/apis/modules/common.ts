import request from '../request'

interface UploadRes {
    /* 文件名 */
    name: string
    /* 文件大小 */
    size: number
    /* 文件后缀 */
    suffix: string
    /* 文件地址 */
    uri: string
}

// 文件上传
export const upload = (formData: FormData) =>
    request.post<UploadRes>('common/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
