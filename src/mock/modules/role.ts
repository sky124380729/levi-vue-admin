const roleTemp = {
    'id|+1': 1,
    roleName: '@word',
    note: '@csentence'
}

export default [
    {
        url: 'role/list',
        method: 'post',
        t: {
            code: 0,
            'data|10': [roleTemp],
            success: true
        }
    },
    {
        url: 'role/page',
        method: 'post',
        t: {
            code: 0,
            data: {
                current: 1,
                pages: 1,
                'records|2': [roleTemp],
                size: 10,
                total: 2
            },
            success: true
        }
    },
    {
        url: /role\/.+/,
        method: 'get',
        t: {
            code: 0,
            data: roleTemp,
            success: true
        }
    },
    {
        url: 'role/save',
        method: 'post',
        t: {
            code: 0,
            data: roleTemp,
            success: true
        }
    },
    {
        url: 'role/update',
        method: 'put',
        t: {
            code: 0,
            data: roleTemp,
            success: true
        }
    },
    {
        url: /role\/.+/,
        method: 'delete',
        t: {
            code: 0,
            data: null,
            success: true
        }
    }
]
