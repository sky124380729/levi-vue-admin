<template>
    <Form :schemas="schemas"></Form>
</template>

<script lang="ts">
import Form, { FormSchema } from '/@/components/Form'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'platform',
    components: {
        Form
    },
    setup() {
        const schemas: FormSchema[] = [
            { key: 'name', label: '姓名', component: 'Input' },
            { key: 'code', label: '编码', component: 'Input' }
        ]
        return {
            schemas
        }
    }
})
</script>
