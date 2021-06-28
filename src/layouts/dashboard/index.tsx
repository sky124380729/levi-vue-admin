import { computed, defineComponent, ref, unref, watchEffect } from 'vue'
import Sider from './sider'
import Content from './content/index.vue'
import NavTags from './header/navTags'
import Navbar from './header/Navbar'
import store from '/@/store'
import './index.less'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'Layout',
    setup() {
        const isCollapse = computed(() => store.getters.getCollapse)
        const { currentRoute } = useRouter()
        const isFullscreen = ref<boolean>(false)
        watchEffect(() => {
            const { fullscreen } = currentRoute.value.meta
            isFullscreen.value = !!fullscreen
        })
        return () => (
            <div class={['levi-layout', { isFullscreen: unref(isFullscreen) }]}>
                <div class={['levi-sider', { isCollapse: unref(isCollapse) }]}>
                    <Sider></Sider>
                </div>
                <div class='levi-main'>
                    <div class='levi-header'>
                        <div class='levi-navbar'>
                            <Navbar />
                        </div>
                        <NavTags />
                    </div>
                    <div class='levi-content'>
                        <Content></Content>
                    </div>
                </div>
            </div>
        )
    }
})
