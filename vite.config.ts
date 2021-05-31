import type { UserConfig } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJSx from '@vitejs/plugin-vue-jsx'
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

const viteConfig: UserConfig = {
    // the key **must start and end with a slash**
    resolve: {
        alias: {
            '/@': pathResolve('./src'),
            '/imgs': pathResolve('./src/assets/images'),
            '/apis': pathResolve('./src/apis/modules')
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                // modifyVars: {
                //   // reference:  Avoid repeated references
                //   hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
                //   ...modifyVars,
                // },
                javascriptEnabled: true
            }
        }
    },
    server: {
        host: true,
        port: 3399,
        open: true
    },
    optimizeDeps: {
        include: ['@ant-design/icons-vue', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US']
    },
    plugins: [vue(), vueJSx(), PurgeIcons()]
}

export default viteConfig
