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
    build: {
        rollupOptions: {
            external: ['vue', 'moment', 'ant-design-vue'],
            output: {
                paths: {
                    vue: 'https://cdn.jsdelivr.net/npm/vue@3.0.7/dist/vue.esm-browser.prod.js',
                    moment: 'https://cdn.jsdelivr.net/npm/moment@2.29.1/dist/moment.js',
                    'ant-design-vue': 'https://cdn.jsdelivr.net/npm/ant-design-vue@2.0.1/dist/antd.js'
                }
            }
        }
    },
    server: {
        port: 3399,
        open: true
    },
    optimizeDeps: {
        include: ['@ant-design/icons-vue', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US']
    },
    plugins: [vue(), vueJSx(), PurgeIcons()]
}

export default viteConfig
