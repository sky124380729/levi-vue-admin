export const resData = <T>(res: T): ResponseData<T> => {
    return {
        code: 200,
        data: res,
        success: true,
        message: '成功!'
    }
}

export const resPageData = (res: any) => {
    return {
        code: 200,
        data: {
            current: 1,
            pages: 1,
            records: res,
            total: 2
        },
        success: true,
        message: '成功!'
    }
}
