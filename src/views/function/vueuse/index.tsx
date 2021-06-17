{
    /* <template>
    <a-tabs>
        <a-tab-pane v-for="item in components" :key="item.key" :tab="item.key"> <[item.component] /> </a-tab-pane>
    </a-tabs>
</template> */
}

import { defineComponent, defineAsyncComponent, resolveDynamicComponent, Component, h } from 'vue'
import { Tabs } from 'ant-design-vue'

const modules = import.meta.glob('./hooks/*.vue')
const components: any = {}
Object.keys(modules).forEach((key) => {
    const name = key.replace(/\.\/hooks\/(.*)\.vue/, '$1')
    const component = modules[key]
    components[name] = defineAsyncComponent(component)
})
export default defineComponent({
    name: 'funciton-vueuse',
    components,
    setup() {
        return () => {
            return (
                <Tabs>
                    {Object.keys(components).map((key) => {
                        const comp = resolveDynamicComponent(key) as Component
                        return (
                            <Tabs.TabPane key={key} tab={key}>
                                {() => h(comp)}
                            </Tabs.TabPane>
                        )
                    })}
                </Tabs>
            )
        }
    }
})
