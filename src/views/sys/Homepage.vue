<template>
    <a-tabs type="card">
        <a-tab-pane key="Form" tab="Form">
            <lv-form v-model="model" :label-width="140" :schemas="schemas" :column="2" />
            <a-space>
                <a-button type="primary" @click="set('disabled')">设置禁用</a-button>
                <a-button type="primary" @click="set('show')">设置显示</a-button>
            </a-space>
        </a-tab-pane>
        <a-tab-pane key="Table" tab="Table">
            <lv-table :action="action" :columns="columns"></lv-table>
        </a-tab-pane>
        <a-tab-pane key="Select" tab="Select">
            <lv-select v-model:value="selectValue" mode="tags" :options="options" :style="{ width: '200px' }" @change="onChange"></lv-select>
        </a-tab-pane>
        <a-tab-pane key="FormModal" tab="FormModal">
            <lv-modal-form v-model:visible="visible" v-model:form="form" title="测试弹框" :label-width="100" :schemas="schemas"></lv-modal-form>
            <a-button type="primary" @click="visible = true">弹框</a-button>
        </a-tab-pane>
    </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, computed, toRefs } from 'vue'
import useList from '/@/hooks/useList'
import { fetchUserList, fetchUserPage } from '/@/apis/modules/user'
import Form, { FormSchema } from '/@/components/Form'
import ModalForm from '/@/components/ModalForm'
export default defineComponent({
    components: {
        LvForm: Form,
        LvModalForm: ModalForm
    },
    setup() {
        // table
        const table = reactive({
            action: fetchUserPage,
            columns: [
                { title: '登录名', dataIndex: 'username' },
                { title: '用户编号', dataIndex: 'userNo' },
                { title: '姓名', dataIndex: 'realName' },
                { title: '手机号', dataIndex: 'mobile' },
                { title: '邮箱', dataIndex: 'email' },
                { title: '部门', dataIndex: 'dept' },
                { title: '描述', dataIndex: 'note' },
                { title: '操作', width: '200px', slots: { customRender: 'operation' } }
            ]
        })

        // select
        const selectValue = ref([])
        const options = useList(fetchUserList, 'username')
        const onChange = (val: any, options: any[]) => {
            console.log(val, options)
        }

        // form
        const set = (key: keyof typeof model) => {
            model[key] = !model[key]
        }
        const model = reactive({
            disabled: false,
            show: true
        })

        const schemas = ref<FormSchema[]>([
            {
                key: 'username',
                label: '用户名称',
                component: 'LvSelect',
                props: {
                    options: useList(fetchUserList, 'username')
                }
            },
            {
                key: 'type',
                label: '类型',
                component: 'Select',
                show: computed(() => model.show),
                props: {
                    disabled: toRef(model, 'disabled'),
                    options: [
                        { label: '电商', value: 'a' },
                        { label: '实体店', value: 'b' }
                    ]
                }
            },
            { key: 'companyName', label: '客户名称', component: 'LvInput', slots: { prefix: () => '$' } },
            { key: 'socialCreditCode', label: '信用代码', component: 'Input' },
            {
                key: 'companyIndustry',
                label: '客户行业',
                component: 'LvSelect',
                rules: { type: 'string', required: true, message: '请选择客户行业' },
                props: {
                    dict: 'weixiu',
                    disabled: computed(() => model.disabled)
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
            // table
            ...toRefs(table),
            // select
            selectValue,
            options,
            onChange,
            // form
            model,
            schemas,
            set,
            // modalForm
            visible,
            form,
            show
        }
    }
})
</script>
