import { defineComponent, watch, reactive, computed, ref, unref, Transition } from 'vue'
import { useRouter } from 'vue-router'
import { Select } from 'ant-design-vue'
import { LvIcon } from '/@/components'
import storage from '@pinkbin/storage'
import { filterUniqueByKey } from '@pinkbin/utils'
import './index.less'

interface LatestVisited {
    label: string
    path: string
}

interface CommonlyVisited {
    label: string
    count: number
}

const LATEST_VISITED_NAME = 'latestVisited'
const COMMONLY_VISITED_NAME = 'commonlyVisited'

export default defineComponent({
    name: 'visited-menu',
    setup() {
        const menuShow = ref<boolean>(false)
        const commonlyVisited = reactive<Record<string, CommonlyVisited>>(storage.local.get(COMMONLY_VISITED_NAME) || {})
        const latestVisted = ref<LatestVisited[]>(storage.local.get(LATEST_VISITED_NAME) || [])
        const currentPath = ref<string>('')
        const orderedCommonlyVisited = computed(() => {
            const rets = []
            for (const [path, { label, count }] of Object.entries(commonlyVisited)) {
                if (!path) continue
                rets.push({ label, value: path, count })
            }
            rets.sort((a, b) => b.count - a.count)
            return rets
        })
        const { push, currentRoute } = useRouter()
        const handleSelectChange = (val: string): void => {
            push(val)
        }
        const toggleVisiteMenu = (flag: boolean): void => {
            menuShow.value = flag
        }
        watch(
            currentRoute,
            (route) => {
                const { path, meta } = route
                // avoid login page
                if (path === '/login') return
                // set current
                currentPath.value = path
                // set visited history
                commonlyVisited[path] = commonlyVisited[path] || { label: meta.title, count: 0 }
                commonlyVisited[path].count++
                storage.local.set(COMMONLY_VISITED_NAME, commonlyVisited)
                // set lastest visited info,we only take the first four
                latestVisted.value.unshift({ label: meta.title as string, path })
                const ret = filterUniqueByKey(latestVisted.value, 'path').slice(0, 4)
                latestVisted.value = ret
                storage.local.set(LATEST_VISITED_NAME, ret)
            },
            { immediate: true }
        )

        return () => (
            <div class='levi-visited-menu'>
                <Transition name='fade-slide' mode='out-in' appear={true}>
                    {!menuShow.value ? (
                        <div class='input-container' onClick={() => toggleVisiteMenu(true)}>
                            <LvIcon icon='si-glyph:foot-sign' size={20}></LvIcon>
                            <span>visited</span>
                        </div>
                    ) : (
                        <Select onBlur={() => toggleVisiteMenu(false)} class='select-container' value={unref(currentPath)} onChange={handleSelectChange}>
                            <Select.OptGroup label='latest visited'>
                                {latestVisted.value.map((option, index) => {
                                    // current path, should not display
                                    if (index === 0) return null
                                    return (
                                        <Select.Option key={'l' + option.path} value={option.path}>
                                            {option.label}
                                        </Select.Option>
                                    )
                                })}
                            </Select.OptGroup>
                            <Select.OptGroup label='commonly visited'>
                                {orderedCommonlyVisited.value.map((option) => (
                                    <Select.Option key={'s' + option.value} value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                ))}
                            </Select.OptGroup>
                        </Select>
                    )}
                </Transition>
            </div>
        )
    }
})
