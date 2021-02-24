import { defineComponent, onActivated, onMounted, PropType, ref, watch, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import { debounce, ownAddEventListener } from '/@/utils'
import { isNumber } from '/@/utils/is'

export default defineComponent({
    name: 'LvCharts',
    props: {
        options: {
            required: true,
            type: Object as PropType<EChartsOption>
        },
        height: {
            type: [Number, String] as PropType<string | number>,
            default: 300
        }
    },
    setup(props) {
        const wrapper = ref<HTMLDivElement | null>(null)
        let chart: Nullable<ECharts> = null
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
        onMounted(() => {
            init()
        })
        onActivated(() => {
            chart && chart.resize()
        })
        watchEffect((onInvalidate) => {
            // 屏幕变化的时候echarts大小重置
            const resizeEvent = ownAddEventListener(
                window,
                'resize',
                debounce(() => {
                    chart && chart.resize()
                })
            )
            onInvalidate(() => {
                resizeEvent()
            })
        })

        return () => {
            let { height } = props
            height = isNumber(height) ? `${height}px` : height
            return <div class='levi-charts' style={{ height }} ref={wrapper}></div>
        }
    }
})
