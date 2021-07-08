import { ref, defineComponent, unref, computed, watch } from 'vue'
import { Menu } from 'ant-design-vue'
import { useStore } from 'vuex'
import { LvIcon } from '/@/components'
import type { IResource } from '/@/router/types'
import { useRouter } from 'vue-router'
import LogoImg from '/@/assets/images/logo.png'
import store from '/@/store'

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const { push, currentRoute } = useRouter()
        const selectedKeys = ref<string[]>([])
        const openKeys = ref<string[]>([])
        const isCollapse = computed(() => store.getters.getCollapse)
        const menus = useStore().getters.getMenuList

        // const subMenuKeys
        const rootSubMenuKeys: string[] = []
        for (const { children, id } of unref(menus)) {
            if (children && children.length > 0) {
                rootSubMenuKeys.push(id)
            }
        }

        watch(
            () => currentRoute.value.matched,
            (arr) => {
                selectedKeys.value = []
                for (let i = arr.length - 1; i >= 0; i--) {
                    const { meta } = arr[i]
                    const id = meta.id as string
                    const hidden = meta.hidden as boolean
                    if (hidden) continue
                    selectedKeys.value.push(id)
                    if (rootSubMenuKeys.indexOf(id) !== -1 && openKeys.value.indexOf(id) === -1) {
                        openKeys.value.push(id)
                    }
                }
            },
            { immediate: true }
        )

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
                                        <LvIcon icon={icon || 'mdi:menu'}></LvIcon>
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
                                    <LvIcon icon={icon || 'mdi:menu'}></LvIcon>
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
            const fullName = keys.reduce((name, key) => {
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
        }

        // submenu点击事件
        const handleTitleClick = (e: MouseEvent, key: string) => {
            const index = openKeys.value.indexOf(key)
            if (index === -1) openKeys.value = [key]
            else openKeys.value = []
        }

        return () => {
            return (
                <>
                    <div class='logo'>
                        <img src={LogoImg} />
                        <h1>Levi Vue Admin</h1>
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
