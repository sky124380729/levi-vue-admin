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
        <a-tab-pane key="Print" tab="Print">
            <a-button v-print="'#print'" type="primary">打印</a-button>
            <div id="print" class="page">
                <p class="page_title">工单检测汇总报告</p>
                <div class="print-form">
                    <a-row>
                        <a-col :span="12">
                            <div class="form-item">
                                <div class="form-label">工单号码</div>
                                <div class="form-input">{{ workOrderInfo.workOrder }}</div>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="form-item">
                                <div class="form-label">产品料号</div>
                                <div class="form-input">{{ workOrderInfo.materialCode }}</div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <div class="form-item">
                                <div class="form-label">检测数量(pcs)</div>
                                <div class="form-input">{{ workOrderInfo.testQty }}</div>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="form-item">
                                <div class="form-label">良率(%)</div>
                                <div class="form-input">{{ workOrderInfo.rate }}</div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <div class="form-item">
                                <div class="form-label">PASS数量(pcs)</div>
                                <div class="form-input">{{ workOrderInfo.passQty }}</div>
                            </div>
                        </a-col>
                        <a-col :span="12">
                            <div class="form-item">
                                <div class="form-label">FAIL数量(pcs)</div>
                                <div class="form-input">{{ workOrderInfo.failQty }}</div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <div class="Inspection-details"></div>
                <div class="printTime">
                    <p>打印时间：</p>
                </div>
                <div class="sign">
                    <p>制表人：______________________</p>
                    <p>审核签名：______________________</p>
                    <p>审核时间：______________________</p>
                </div>
            </div>
        </a-tab-pane>
    </a-tabs>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, computed, toRefs } from 'vue'
import useList from '/@/hooks/useList'
import { fetchUserList, fetchUserPage } from '/@/apis/modules/user'
import Form, { FormSchema } from '/@/components/Form'
import ModalForm from '/@/components/ModalForm'
import print from '/@/directives/print'
export default defineComponent({
    components: {
        LvForm: Form,
        LvModalForm: ModalForm
    },
    directives: {
        print
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

        // print
        const workOrderInfo = reactive<any>({
            workOrder: 'CK-1032',
            materialCode: 'XK201879',
            testQty: 10000,
            rate: '90%',
            passQty: 9000,
            failQty: 1000
        })

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
            show,
            // print
            workOrderInfo
        }
    }
})
</script>

<style lang="less" scoped>
@color-border: #000;
@color-bg: #f5f5f5;
@color-font: #000;
.page {
    width: 21cm;
    min-height: 29.7cm;
    border: 1px solid @color-border;
    padding: 20px;
    position: relative;
    margin: 20px auto;
    color: @color-font;
    &_logo {
        position: absolute;
        top: 20px;
        left: 20px;
        height: 50px;
        width: 184px;
    }
    &_title {
        text-align: center;
        font-size: 24px;
        line-height: 56px;
    }
    .info {
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
    }
    .print-form {
        border-top: 1px solid @color-border;
        border-right: 1px solid @color-border;
        margin: 40px 0px 20px 0px;
        font-size: 14px;
        .form-item {
            display: flex;
            height: 70px;
            line-height: 70px;
            border-bottom: 1px solid @color-border;
            .form-label {
                flex: 2;
                text-align: right;
                border-left: 1px solid @color-border;
                border-right: 1px solid @color-border;
                padding-right: 20px;
                background-color: @color-bg;
            }
            .form-input {
                flex: 3;
                padding-left: 20px;
            }
        }
    }

    .subtitle {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .Inspection-details {
        margin-bottom: 60px;
    }

    .print-table {
        width: 100%;
        table-layout: fixed;
        border: 1px solid @color-border;
        border-collapse: collapse;
        font-size: 14px;
        color: @color-font;
        border-spacing: 0;
        margin-top: -1px;
        th {
            padding: 12px 0;
        }
        td {
            padding: 20px 0;
            font-size: 12px;
        }
        thead {
            background: @color-bg;
            th {
                border: 1px solid @color-border;
                font-weight: normal;
            }
        }
        tbody {
            td {
                border-right: 1px solid @color-border;
                border-bottom: 1px solid @color-border;
                text-align: center;
            }
        }
    }
    .printTime {
        position: absolute;
        bottom: 30px;
        right: 30px;
    }
    .sign {
        position: absolute;
        bottom: -5px;
        right: 20px;
        left: 20px;
        display: flex;
        justify-content: space-around;
    }
}
@media print {
    body,
    .page {
        margin: 0;
        box-shadow: 0;
    }
}
</style>
