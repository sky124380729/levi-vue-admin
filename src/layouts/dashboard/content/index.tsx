// vue3的keep-alive不会在函数式组件中正常工作，因为他们没有缓存实例，这个页面暂时不用

import { computed, KeepAlive, unref } from 'vue'
import type { FunctionalComponent } from 'vue'
import { defineComponent, Transition } from 'vue'
import { RouterView, RouteLocation } from 'vue-router'
import store from '/@/store'

interface DefaultContext {
    Component: FunctionalComponent
    route: RouteLocation
}

export default defineComponent({
    name: 'Content',
    setup() {
        const cachedViews = computed(() => store.getters.getCachedViews)
        return () => {
            return (
                <RouterView>
                    {{
                        default: ({ Component, route }: DefaultContext) => {
                            const renderComp = () => <Component key={route.fullPath} />
                            const isFullscreen = route.meta.fullscreen
                            const PageContent = <KeepAlive include={unref(cachedViews)}>{renderComp()}</KeepAlive>
                            return (
                                <Transition name={!isFullscreen ? 'fade-slide' : ''} mode='out-in' appear={true}>
                                    {() => PageContent}
                                </Transition>
                            )
                        }
                    }}
                </RouterView>
            )
        }
    }
})
