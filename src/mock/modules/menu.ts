import Mock from 'mockjs'

import menu from '/@/router/menu.json'

// 资源树
Mock.mock('menu/tree', 'get', {
    code: 0,
    data: menu,
    success: true
})
