const userTemp = {
    'id|+1': 1,
    username: '@name',
    realName: '@cname',
    'userNo|1-100': 0,
    mobile: 18852992000,
    dept: '@word',
    note: '@csentence',
    email: '@email'
}

export default [
    {
        url: 'user/list',
        method: 'post',
        t: {
            code: 0,
            'data|10': [userTemp],
            success: true
        }
    },
    {
        url: 'user/page',
        method: 'post',
        t: {
            code: 0,
            data: {
                current: 1,
                pages: 1,
                'records|2': [userTemp],
                size: 10,
                total: 2
            },
            success: true
        }
    },
    {
        url: /user\/.+/,
        method: 'get',
        t: {
            code: 0,
            data: userTemp,
            success: true
        }
    },
    {
        url: 'user/save',
        method: 'post',
        t: {
            code: 0,
            data: userTemp,
            success: true
        }
    },
    {
        url: 'user/update',
        method: 'put',
        t: {
            code: 0,
            data: userTemp,
            success: true
        }
    },
    {
        url: /user\/.+/,
        method: 'delete',
        t: {
            code: 0,
            data: null,
            success: true
        }
    }
]
