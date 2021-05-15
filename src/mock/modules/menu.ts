import menu from '/@/router/menu.json'

import { createMenuId } from '/@/store'

createMenuId(menu)

export default [
    {
        url: 'menu/tree',
        method: 'get',
        t: {
            code: 0,
            data: menu,
            success: true
        }
    }
]
