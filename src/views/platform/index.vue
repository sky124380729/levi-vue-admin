<template>
    <div>
        <Form layout="inline" :label-col="{ span: 12 }" label-align="right" :model="model" :schemas="schemas"></Form>
        <Charts :options="options"></Charts>
    </div>
</template>

<script lang="ts">
import Form, { FormSchema } from '/@/components/Form'
import Charts from '/@/components/Charts/index'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    name: 'platform',
    components: {
        Form,
        Charts
    },
    setup() {
        const schemas: FormSchema[] = [
            {
                key: 'name',
                label: '姓名',
                component: 'Input'
            },
            {
                key: 'code',
                label: '编码',
                component: 'Select',
                props: {
                    options: [
                        { label: 'x', value: '1' },
                        { label: 'y', value: '2' }
                    ]
                }
            }
        ]
        const model = reactive({})
        return {
            schemas,
            model,
            options: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' }
                        ]
                    }
                ]
            }
        }
    }
})
</script>
