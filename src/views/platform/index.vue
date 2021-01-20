<template>
    <Form layout="inline" :label-col="{ span: 12 }" label-align="right" :model="model" :schemas="schemas"></Form>
</template>

<script lang="ts">
import Form, { FormSchema } from '/@/components/Form'
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    name: 'platform',
    components: {
        Form
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
                rules: {
                    required: true
                },
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
            model
        }
    }
})
</script>
