import store from '/@/store'
import Breadcrumb from './Breadcrumb'
import Icon from '/@/components/Icon'
import { Dropdown, Menu, message, Drawer, Divider, Switch } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { defineComponent, ref, unref } from 'vue'

export default defineComponent({
    name: 'Navbar',
    setup() {
        const { push } = useRouter()
        const drawerVisible = ref<boolean>(false)
        const themeDark = ref<boolean>(false)
        const setCollapse = () => {
            store.commit('setCollapse', !store.getters.getCollapse)
        }
        type MenuKey = 'settings' | 'logout'
        // menu click event
        const handleMenuClick = ({ key }: { key: MenuKey }) => {
            if (key === 'settings') {
                message.warn('此功能暂未开放')
            } else if (key === 'logout') {
                Cookies.remove('token')
                push('/login')
            }
        }
        // settings click event
        const showSettings = () => {
            drawerVisible.value = true
        }

        // theme change
        const themeChange = (checked: boolean) => {
            themeDark.value = checked
        }

        return () => {
            return (
                <>
                    <Drawer
                        title='settings'
                        visible={unref(drawerVisible)}
                        onClose={() => {
                            drawerVisible.value = false
                        }}
                    >
                        <Divider>主题</Divider>
                        <Switch checked={unref(themeDark)} onChange={themeChange}>
                            {{
                                checkedChildren: () => <Icon slot='checkedChildren' icon='ic:outline-wb-sunny' />,
                                unCheckedChildren: () => <Icon slot='checkedChildren' icon='ic:outline-dark-mode' />
                            }}
                        </Switch>
                    </Drawer>
                    <div class='levi-navbar__content'>
                        <div class='levi-navbar__left'>
                            <span class='collapse-icon' onClick={setCollapse}>
                                {store.getters.getCollapse ? <Icon icon='ri:menu-unfold-fill' /> : <Icon icon='ri:menu-fold-fill' />}
                            </span>
                            <Breadcrumb></Breadcrumb>
                        </div>
                    </div>
                    <div class='levi-navbar__action'>
                        <Dropdown trigger={['click']}>
                            {{
                                default: () => (
                                    <a class='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
                                        Hi,Levi <DownOutlined />
                                    </a>
                                ),
                                overlay: () => (
                                    <Menu onClick={handleMenuClick}>
                                        {() => (
                                            <>
                                                <Menu.Item key='settings'>{() => '设置'}</Menu.Item>
                                                {/* <Menu.Divider /> */}
                                                <Menu.Item key='logout'>{() => '退出登录'}</Menu.Item>
                                            </>
                                        )}
                                    </Menu>
                                )
                            }}
                        </Dropdown>
                        <Icon class='settings-icon' onClick={showSettings} icon='ri:settings-4-line' size={18} />
                    </div>
                </>
            )
        }
    }
})
