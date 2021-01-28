import { defineComponent, onActivated, onMounted, PropType, ref, watch, watchEffect } from 'vue'
import type { EChartOption, ECharts } from 'echarts'
import echarts from 'echarts'
import { debounce, ownAddEventListener } from '/@/utils'
import './index.less'

export default defineComponent({
    name: 'LvCharts',
    props: {
        options: {
            required: true,
            type: Object as PropType<EChartOption>
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
                init()
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

        return () => <div class='levi-charts' ref={wrapper}></div>
    }
})
