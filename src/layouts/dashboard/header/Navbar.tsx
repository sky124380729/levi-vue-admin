import store from '/@/store'
import Breadcrumb from './Breadcrumb'
import Icon from '/@/components/Icon'
import { Dropdown, Menu, message } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Navbar',
    setup() {
        const { push } = useRouter()
        const setCollapse = () => {
            store.commit('setCollapse', !store.state.isCollapse)
        }
        type MenuKey = 'settings' | 'logout'
        // menu点击事件
        const handleMenuClick = ({ key }: { key: MenuKey }) => {
            if (key === 'settings') {
                message.warn('此功能暂未开放')
            } else if (key === 'logout') {
                Cookies.remove('token')
                store.commit('setAuthority', false)
                push('/login')
            }
        }
        return () => {
            return (
                <>
                    <div class='levi-navbar__content'>
                        <div class='levi-navbar__left'>
                            <span class='collapse-icon' onClick={setCollapse}>
                                {store.state.isCollapse ? <Icon icon='ri:menu-unfold-fill' /> : <Icon icon='ri:menu-fold-fill' />}
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
                    </div>
                </>
            )
        }
    }
})
