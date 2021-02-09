import Mock from 'mockjs'

// 角色绑定资源查询
Mock.mock(/roleMenu\/roleId\/.+/, 'get', {
    code: 0,
    data: [],
    success: true
})

// 角色绑定资源提交
Mock.mock(/roleMenu\/saveOrUpdate\/.+/, 'post', {
    code: 0,
    data: null,
    success: true
})
