import { defineConfig } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import pkg from './package.json'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import vueI18n from './vite/plugins/i18n'
import antdTheme from './vite/plugins/antdTheme'
import modifyVars from './src/styles/theme/vars'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)
const { dependencies, devDependencies, name, version } = pkg
import moment from 'moment'
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss')
}
const viteConfig = defineConfig({
    // the key **must start and end with a slash**
    resolve: {
        alias: [
            {
                find: /\/@\//,
                replacement: pathResolve('src') + '/'
            },
            {
                find: /\/vt\//,
                replacement: pathResolve('vite') + '/'
            },
            {
                find: /\/imgs\//,
                replacement: pathResolve('src') + '/assets/images/'
            },
            {
                find: /\/#\//,
                replacement: pathResolve('types') + '/'
            }
        ]
    },
    base: '/',
    define: {
        __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    envDir: pathResolve('./env'),
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    // reference:  Avoid repeated references
                    //   hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
                    ...modifyVars
                },
                javascriptEnabled: true
            }
        }
    },
    server: {
        host: true,
        port: 3399,
        open: false
    },
    optimizeDeps: {
        include: ['@ant-design/icons-vue', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US']
    },
    plugins: [
        vue(),
        vueJSX(),
        PurgeIcons(),
        vueI18n(),
        antdTheme({
            colors: {
                blue: '#442288',
                red: '#333'
            }
            // dark: true
            // backgroundColor: 'red'
        }),
        ViteComponents({
            customComponentResolvers: [AntDesignVueResolver()]
        })
    ]
})

export default viteConfig
