export default [
    {
        url: 'sysDict/map',
        method: 'get',
        t() {
            return {
                code: 0,
                data: {
                    weixiu: {
                        w01: '直振',
                        w02: '圆振',
                        w03: '直振控制器',
                        w04: '圆振控制器'
                    }
                },
                success: true
            }
        }
    }
]
