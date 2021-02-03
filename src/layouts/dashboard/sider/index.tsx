import { ref, defineComponent, watchEffect, unref, computed } from 'vue'
import { Menu } from 'ant-design-vue'
import { useStore } from 'vuex'
import Icon from '/@/components/Icon'
import type { IResource } from '/@/router/types'
import { useRouter } from 'vue-router'
import LogoImg from '/@/assets/images/ck-logo.png'
import store from '/@/store'

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const { push, currentRoute } = useRouter()
        const selectedKeys = ref<string[]>([])
        const openKeys = ref<string[]>([])
        const isCollapse = computed(() => store.state.isCollapse)
        const menus = useStore().getters.menuList

        watchEffect(() => {
            selectedKeys.value = []
            const { matched } = currentRoute.value
            for (let i = matched.length - 1; i >= 0; i--) {
                const { meta } = matched[i]
                const { id, hidden } = meta
                if (hidden) continue
                selectedKeys.value.push(id)
                openKeys.value.push(id)
            }
        })

        // 创建菜单
        const generateMenus = (routes: IResource[], fullPath = '') => {
            return routes.map((route: IResource) => {
                const { id, title, path, children, icon } = route
                const newPath = fullPath + '/' + path
                if (children && children.length) {
                    return (
                        <Menu.SubMenu key={id} onTitleClick={handleTitleClick}>
                            {{
                                default: () => generateMenus(children, newPath),
                                title: () => [
                                    <>
                                        <Icon icon={icon || 'mdi:menu'}></Icon>
                                        <span>{title}</span>
                                    </>
                                ]
                            }}
                        </Menu.SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={id} title={title}>
                            {() => [
                                <>
                                    <Icon icon={icon || 'mdi:menu'}></Icon>
                                    <span>{title}</span>
                                </>
                            ]}
                        </Menu.Item>
                    )
                }
            })
        }

        // 根据keyPath的id生成name
        const generateNameList = (keys: string[], resource: IResource[]): string => {
            const fullName = keys.reduceRight((name, key) => {
                for (let i = 0; i < resource.length; i++) {
                    if (resource[i].id === key) {
                        name += '-' + resource[i].name
                        if (resource[i].children) {
                            resource = resource[i].children || []
                        }
                    }
                }
                return name
            }, '')
            return fullName.slice(1)
        }
        // menu点击事件
        const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
            const name = generateNameList(keyPath, menus)
            // 路由跳转
            push({ name })
            openKeys.value = keyPath
        }
        // submenu点击事件
        const handleTitleClick = ({ key }: { key: string }) => {
            const index = openKeys.value.indexOf(key)
            if (index === -1) {
                openKeys.value.push(key)
            } else {
                openKeys.value.splice(index, 1)
            }
        }

        return () => {
            return (
                <>
                    <div class='logo'>
                        <img src={LogoImg} />
                    </div>
                    <div class='menu'>
                        <Menu
                            onClick={handleMenuClick}
                            selectedKeys={unref(selectedKeys)}
                            openKeys={unref(isCollapse) ? undefined : unref(openKeys)}
                            inlineCollapsed={unref(isCollapse)}
                            mode='inline'
                            theme='dark'
                        >
                            {() => generateMenus(menus)}
                        </Menu>
                    </div>
                </>
            )
        }
    }
})
