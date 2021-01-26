<template>
    <div>
        <Table ref="tableRef" title="角色管理" :columns="columns" :action="action">
            <template #extra>
                <a-button type="primary" @click="handle">
                    <template #icon><Icon icon="ic:round-add-circle-outline"></Icon></template>新增
                </a-button>
            </template>
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="handle(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button type="link" size="small" @click="handle(record)">删除</a-button>
            </template>
        </Table>
        <a-modal v-model:visible="visible" title="用户信息" width="460px" :after-close="modalAfterClose" @ok="submitForm">
            <a-form ref="ruleForm" :model="form" :rules="rules" label-align="right" scroll-to-first-error :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                <a-form-item label="角色名称" name="roleName">
                    <a-input v-model:value="form.roleName" />
                </a-form-item>
                <a-form-item label="角色描述" name="note">
                    <a-textarea v-model:value="form.note" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, createVNode, h } from 'vue'
import { Modal } from 'ant-design-vue'
import Icon from '/@/components/Icon'
import Table from '/@/components/Table'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { fetchRolePage, updateRole, createRole, getRole, removeRole } from '/@/apis/modules/role'

export default defineComponent({
    name: 'system-role',
    components: {
        Table,
        Icon
    },
    setup() {
        const visible = ref<boolean>(false)
        const form = ref<any>({})
        const tableRef = ref<any>(null)
        const ruleForm = ref()
        const submitLoading = ref<boolean>(false)
        const rules = reactive({
            roleName: { required: true }
        })
        const terms = [
            {
                key: 'roleName',
                label: '角色名称',
                component: 'Input'
            }
        ]
        const submitForm = () => {
            ruleForm.value
                .validate()
                .then(async () => {
                    submitLoading.value = true
                    const data = form.value
                    const res = await (data.id ? updateRole(data) : createRole(data))
                    submitLoading.value = false
                    if (!res) return
                    tableRef.value && tableRef.value.reload()
                    visible.value = false
                })
                .catch(() => null)
        }
        const modalAfterClose = () => {
            ruleForm.value.clearValidate()
            form.value = {}
        }
        const handle = async ({ id }: { id: string }) => {
            if (id) {
                const res = await getRole(id)
                if (!res) return
                form.value = res.data
            }
            visible.value = true
        }
        const remove = ({ id }: { id: string }) => {
            Modal.confirm({
                title: '提示',
                content: h('div', { style: 'color:#f56c6c' }, [h('p', '确定要删除当前数据吗?')]),
                okButtonProps: {
                    loading: submitLoading
                },
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    removeRole(id).then(() => {
                        tableRef.value!.reload()
                    })
                }
            })
        }
        const columns = [
            { title: '角色名称', dataIndex: 'roleName', width: '40%' },
            { title: '角色描述', dataIndex: 'note', ellipsis: true },
            { title: '操作', width: '160px', slots: { customRender: 'operation' } }
        ]

        return {
            visible,
            form,
            columns,
            terms,
            rules,
            remove,
            handle,
            tableRef,
            submitForm,
            ruleForm,
            modalAfterClose,
            action: fetchRolePage
        }
    }
})
</script>
