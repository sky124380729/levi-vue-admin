<template>
    <a-tabs>
        <a-tab-pane key="FormModal" tab="FormModal" force-render>
            <lv-modal-form v-model:visible="visible" v-model:form="form" title="测试弹框" :label-width="100" :schemas="schemas"></lv-modal-form>
            <a-button type="primary" @click="visible = true">弹框</a-button>
        </a-tab-pane>
        <a-tab-pane key="Form" tab="Form">
            <lv-form v-model="model" :label-width="140" :schemas="schemas" :column="2" />
            <a-space>
                <a-button type="primary" @click="set('disabled')">设置禁用</a-button>
                <a-button type="primary" @click="set('show')">设置显示</a-button>
            </a-space>
        </a-tab-pane>
    </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'

import Form from '/@/components/Form'
import ModalForm from '/@/components/ModalForm'
export default defineComponent({
    components: {
        LvForm: Form,
        LvModalForm: ModalForm
    },
    setup() {
        // form
        const set = (key: keyof typeof model) => {
            model[key] = !model[key]
        }
        const model = reactive({
            disabled: false,
            show: true
        })
        const schemas = ref([
            { key: 'companyName', label: '客户名称', component: 'Input', slots: { prefix: () => '$' } },
            { key: 'socialCreditCode', label: '信用代码', component: 'Input' },
            {
                key: 'companyIndustry',
                label: '客户行业',
                component: 'LvSelect',
                rules: { type: 'string', required: true, message: '请选择客户行业' },
                show: computed(() => model.show),
                props: {
                    dict: 'companyIndustry',
                    disabled: computed(() => model.disabled),
                    options: [
                        { label: 'x', value: '1' },
                        { label: 'y', value: '2' }
                    ]
                }
            },
            { key: 'test', label: '测试时间', component: 'DatePicker' }
        ])

        // modalForm

        const visible = ref(false)
        const form = reactive<any>({
            a: 1
        })
        const show = () => {
            visible.value = true
        }

        return {
            model,
            schemas,
            set,
            visible,
            form,
            show
        }
    }
})
</script>
