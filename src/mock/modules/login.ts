export default [
    {
        url: 'login',
        method: 'post',
        t(req: any) {
            const { username, password } = JSON.parse(req.body)
            if (username === 'levi' && password === '123456') {
                return {
                    code: 0,
                    data: {
                        token: 'whosyourdaddy'
                    },
                    user: {
                        username: 'levi'
                    },
                    success: true
                }
            }
            return {
                code: 9001,
                message: '登录失败',
                success: false
            }
        }
    }
]
