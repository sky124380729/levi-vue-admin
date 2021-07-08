import { defineComponent, unref, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import Tag from './Tag'
import { useRouter } from 'vue-router'
import store from '/@/store'
import { LvIcon } from '/@/components'
import './index.less'
import { ft } from '@pinkbin/utils'

interface TagRaw {
    name: string
    title: string
    path: string
    noCache?: boolean
}

export default defineComponent({
    name: 'NavTags',
    setup() {
        const { currentRoute, push } = useRouter()
        // 标签列表
        const navTags = ref<TagRaw[]>([{ title: '首页', name: 'homepage', path: '/homepage' }])
        // tag ref
        const navTagsRef = ref<HTMLElement | null>(null)
        // 是否溢出
        const isOverflow = ref<boolean>(false)
        // 关闭时候的 index
        let selectedIndex = -1

        // active的tag定位到可视区域
        const setActiveTagShow = () => {
            // 定位
            nextTick(() => {
                nextTick(() => {
                    const navTagDom = unref(navTagsRef)
                    if (!navTagDom) return
                    const activeDom = navTagDom.querySelector('.nav-tag-btn.active')
                    activeDom?.scrollIntoView(true)
                    const { scrollWidth, offsetWidth } = navTagDom
                    isOverflow.value = scrollWidth > offsetWidth
                })
            })
        }

        // 检查标签是否还在，不在就重定向
        const checkActiveTag = (tags: TagRaw[]) => {
            const activeIndex = navTags.value.findIndex((v) => v.name === currentRoute.value.name)
            if (activeIndex >= 0) return
            let index
            if (tags.length === 1) {
                index = 0
            } else if (selectedIndex > tags.length) {
                index = 1
            } else if (selectedIndex === tags.length - 1) {
                index = selectedIndex
            } else {
                index = selectedIndex - 1
            }
            push({ name: tags[index].name })
        }

        onMounted(() => {
            window.addEventListener('resize', setActiveTagShow)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', setActiveTagShow)
        })

        // 监听路由变化，存入tag
        watch(
            () => currentRoute.value,
            (route) => {
                const { name, path, meta } = route
                const index = navTags.value.findIndex((v) => v.name === name)
                if (index === -1) {
                    navTags.value.push({ name: name as string, path, title: meta.title as string, noCache: meta.noCache as boolean })
                }
            },
            { immediate: true }
        )
        // 监听tag变化
        watch(
            () => unref(navTags),
            (tags) => {
                // 缓存的路由
                const cachedViews = tags.reduce((prev: string[], { name, noCache }: TagRaw) => {
                    !noCache && prev.push(name)
                    return prev
                }, [])
                store.commit('setCachedViews', cachedViews)
                setActiveTagShow()
                checkActiveTag(tags)
            },
            { immediate: true, deep: true }
        )
        // 关闭标签事件
        const closeTag = (index: number): void => {
            navTags.value.splice(index, 1)
            selectedIndex = index
        }
        // 点击标签路由跳转
        const clickTag = (path: string, index: number): void => {
            selectedIndex = index
            push(path)
        }

        // 关闭栏
        const renderActionBoard = () => {
            const actions = [
                { title: '关闭左侧', icon: 'mi:arrow-left', handler: 'closeLeft' },
                { title: '关闭右侧', icon: 'mi:arrow-right', handler: 'closeRight' },
                { title: '关闭其他', icon: 'mi:list', handler: 'closeOthers' },
                { title: '关闭全部', icon: 'mi:circle-error', handler: 'closeAll' }
            ]
            return () =>
                actions.map((action) => (
                    <Menu.Item key={action.handler}>
                        {() => [
                            <>
                                <LvIcon icon={action.icon}></LvIcon>
                                <span>{action.title}</span>
                            </>
                        ]}
                    </Menu.Item>
                ))
        }

        const handleMenuClick = (type: string, key: string) => {
            // 如果是点的标签，则index取selectedIndex
            // 如果是右侧的下拉action，则index取activeIndex
            const activeIndex = navTags.value.findIndex((v) => v.name === currentRoute.value.name)
            const d = type === 'tag' ? selectedIndex : activeIndex
            if (key === 'closeLeft') {
                navTags.value = navTags.value.filter(({ name }, index) => name === 'homepage' || index >= d)
            } else if (key === 'closeRight') {
                navTags.value.splice(d + 1)
            } else if (key === 'closeOthers') {
                navTags.value = navTags.value.filter(({ name }, index) => name === 'homepage' || index === d)
            } else if (key === 'closeAll') {
                navTags.value = navTags.value.filter(({ name }) => name === 'homepage')
            }
        }

        // 左右移动
        const handleNavClick = (d: string) => {
            const dom = navTagsRef.value
            if (!dom) return
            let origin = dom.scrollLeft
            const { scrollWidth, offsetWidth } = dom
            const diff = scrollWidth - offsetWidth // 滚动到最右侧的距离
            const distance = d === 'RIGHT' ? diff - origin : -origin
            let ani = 0
            let preTime = performance.now()
            ;(function frame(currTime = performance.now()) {
                // 超出范围之后就停止动画
                if ((d === 'RIGHT' && origin >= diff) || (d === 'LEFT' && origin <= 0)) return cancelAnimationFrame(ani)
                const step = ft(currTime - preTime, distance)
                dom.scrollLeft = origin += step
                preTime = currTime
                ani = requestAnimationFrame(frame)
            })()
        }

        // 鼠标滚动
        const handleMousewheel = (e: WheelEvent): void => {
            const dom = navTagsRef.value
            if (!dom) return
            dom.scrollLeft += e.deltaY / 3
        }

        return () => (
            <>
                <div class='levi-navTags nav-tag'>
                    <div class={['nav-tag__prev', { 'nav-tag--disabled': !unref(isOverflow) }]} onClick={handleNavClick.bind(null, 'LEFT')}>
                        <LvIcon icon='mi:chevron-left'></LvIcon>
                    </div>
                    <div class='nav-tag__content' ref={navTagsRef} onMousewheel={handleMousewheel}>
                        {unref(navTags).map((tag: TagRaw, index: number) => {
                            const { name, title, path, noCache } = tag
                            return (
                                <Dropdown
                                    onContextmenu={() => {
                                        selectedIndex = index
                                    }}
                                    trigger={['contextmenu']}
                                >
                                    {{
                                        default: () => (
                                            <Tag
                                                active={name === currentRoute.value.name}
                                                icon={noCache ? 'mdi:cube-off-outline' : 'mdi:cube-outline'}
                                                key={name}
                                                title={title}
                                                closable={name !== 'homepage'}
                                                onClose={() => closeTag(index)}
                                                onClick={() => clickTag(path, index)}
                                            ></Tag>
                                        ),
                                        overlay: () => <Menu onClick={({ key }) => handleMenuClick('tag', key)}>{renderActionBoard()}</Menu>
                                    }}
                                </Dropdown>
                            )
                        })}
                    </div>
                    <div class={['nav-tag__next', { 'nav-tag--disabled': !unref(isOverflow) }]} onClick={handleNavClick.bind(null, 'RIGHT')}>
                        <LvIcon icon='mi:chevron-right'></LvIcon>
                    </div>
                    <Dropdown class='nav-tag__action'>
                        {{
                            default: () => <LvIcon icon='mi:list'></LvIcon>,
                            overlay: () => <Menu onClick={({ key }) => handleMenuClick('action', key)}>{renderActionBoard()}</Menu>
                        }}
                    </Dropdown>
                </div>
            </>
        )
    }
})
