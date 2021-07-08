import { defineComponent, inject, unref } from 'vue'
import { Divider, Switch } from 'ant-design-vue'
import { LvIcon } from '/@/components'

export default defineComponent({
    name: 'ThemeChange',
    setup() {
        const theme = unref(inject('theme'))
        const changeTheme = unref(inject('changeTheme')) as any
        return () => (
            <>
                <Divider>主题</Divider>
                <Switch checked={theme === 'light'} onChange={(val) => changeTheme(val ? 'light' : 'dark')}>
                    {{
                        checkedChildren: () => <LvIcon slot='checkedChildren' icon='ic:outline-wb-sunny' />,
                        unCheckedChildren: () => <LvIcon slot='checkedChildren' icon='ic:outline-dark-mode' />
                    }}
                </Switch>
            </>
        )
    }
})
