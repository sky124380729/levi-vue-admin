import { defineComponent, ref, watch, watchEffect } from 'vue'
import ECharts, { EChartsType } from 'echarts'
import { debounce, ownAddEventListener } from '/@/utils'

export default defineComponent({
    name: 'Levi-Charts',
    props: {
        options: {
            required: true,
            type: Object
        }
    },
    setup(props) {
        const chartRef = ref<HTMLElement | null>(null)
        const myChart = ref<EChartsType | null>(null)
        const init = () => {
            if (myChart.value) {
                myChart.value = ECharts.init(chartRef.value!)
                myChart.value.setOption(props.options)
            }
        }
        watch(props.options, () => {
            init()
        })
        watchEffect((onInvalidate) => {
            const resizeEvent = ownAddEventListener(
                window,
                'resize',
                debounce(() => {
                    myChart.value?.resize()
                })
            )
            onInvalidate(() => {
                resizeEvent()
            })
        })

        return () => <div class='levi-charts' ref={chartRef}></div>
    }
})
