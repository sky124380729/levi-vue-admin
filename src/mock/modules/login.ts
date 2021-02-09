import Mock from 'mockjs'

// 登录
Mock.mock('login', 'post', function (req: any) {
    const { username, password } = JSON.parse(req.body)
    if (username === 'admin1' && password === '1234') {
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
})
