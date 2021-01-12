import request from '../request'

interface User {
    name: string
    code: string
}

interface UserRes {
    /** 测试 */
    test: string
}

export const createUser = (data: User) => request.post<UserRes>('xxx/user', data)

createUser({
    name: '1',
    code: '2'
}).then((res) => {
    // console.log(res)
    res.data.test
})
