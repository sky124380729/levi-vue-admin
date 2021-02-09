import menu from '/@/router/menu.json'

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
