import { defineComponent, nextTick, onActivated, onMounted, PropType, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { useStore } from 'vuex'
import type { EChartsOption, ECharts } from 'echarts'
import { useWinResize } from '@pinkbin/vue-hooks'
import { isNumber } from '@pinkbin/utils'

export default defineComponent({
    name: 'LvCharts',
    props: {
        options: {
            required: true,
            type: Object as PropType<EChartsOption>,
            default: () => ({})
        },
        height: {
            type: [Number, String] as PropType<string | number>,
            default: 300
        }
    },
    setup(props, { expose }) {
        const wrapper = ref<HTMLDivElement | null>(null)
        let chart: Nullable<ECharts> = null
        const store = useStore()
        // 初始化函数
        const init = () => {
            if (wrapper.value) {
                chart = echarts.init(wrapper.value)
                chart.setOption(props.options)
            }
        }
        // 参数变化的时候重置
        watch(
            () => props.options,
            () => {
                chart && chart.setOption(props.options)
            }
        )

        // 菜单栏变化的时候重置大小
        watch(
            () => store.getters.getCollapse,
            async () => {
                await nextTick()
                chart && chart.resize()
            }
        )

        onMounted(() => {
            init()
        })

        onActivated(() => {
            chart && chart.resize()
        })
        useWinResize(() => {
            chart && chart.resize()
        })

        expose({
            getInstance() {
                return chart
            }
        })

        return () => {
            let { height } = props
            height = isNumber(height) ? `${height}px` : height
            return <div class='levi-charts' style={{ height }} ref={wrapper}></div>
        }
    }
})
