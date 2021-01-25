import { ref, defineComponent, watchEffect, unref, computed } from 'vue'
import { Menu } from 'ant-design-vue'
import Icon from '/@/components/Icon'
import type { IResource } from '/@/router/index'
import resource from '/@/router/menu.json'
import { useRouter } from 'vue-router'
import { deepClone } from '/@/utils/index'
import LogoImg from '/@/assets/images/ck-logo.png'
import store from '/@/store'

export default defineComponent({
    name: 'Sidebar',
    setup() {
        const { push, currentRoute } = useRouter()
        const selectedKeys = ref<string[]>([])
        const openKeys = ref<string[]>([])
        const isCollapse = computed(() => store.state.isCollapse)
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
        // 过滤meta为hidden的菜单
        const filterResource = (routes: IResource[]) => {
            return routes.filter((route) => {
                if (route.children) {
                    route.children = filterResource(route.children)
                }
                return !route.hidden
            })
        }

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
            const name = generateNameList(keyPath, resource)
            // 路由跳转
            push({ name })
            openKeys.value = keyPath
        }
        // submenu点击事件
        const handleTitleClick = ({ key }: { key: string }) => {
            openKeys.value = [key]
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
                            {() => generateMenus(filterResource(deepClone(resource)))}
                        </Menu>
                    </div>
                </>
            )
        }
    }
})
