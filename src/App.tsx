import { defineComponent, onBeforeMount, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { Locale } from 'ant-design-vue/lib/locale-provider'

export default defineComponent({
    name: 'App',
    setup() {
        const myLocale = ref<Locale | undefined>(undefined)

        onBeforeMount(async () => {
            const locale = await import('ant-design-vue/es/locale/zh_CN')
            myLocale.value = locale.default
        })

        return () => {
            return <ConfigProvider locale={unref(myLocale)}>{() => <RouterView />}</ConfigProvider>
        }
    }
})
