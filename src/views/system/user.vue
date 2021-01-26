<template>
    <div>
        <Table ref="tableRef" title="用户管理" :terms="terms" :columns="columns" :action="action">
            <template #extra>
                <a-button type="primary" @click="handle">
                    <template #icon><Icon icon="ic:round-add-circle-outline"></Icon></template>新增
                </a-button>
            </template>
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="handle(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button type="link" size="small" @click="remove(record)">删除</a-button>
            </template>
        </Table>

        <a-modal v-model:visible="visible" title="用户信息" width="720px" :after-close="modalAfterClose" @ok="submitForm">
            <a-form ref="ruleForm" :model="form" :rules="rules" label-align="right" scroll-to-first-error :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="登录名" name="username">
                            <a-input v-model:value="form.username" :disabled="!!form.id" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="用户编号" name="userNo">
                            <a-input v-model:value="form.userNo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="姓名" name="realName">
                            <a-input v-model:value="form.realName" />
                        </a-form-item>
                    </a-col>
                    <template v-if="!form.id">
                        <a-col :span="12">
                            <a-form-item label="密码" name="password">
                                <a-input v-model:value="form.password" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="确认密码" name="confirmPassword">
                                <a-input v-model:value="form.confirmPassword" />
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :span="12">
                        <a-form-item label="手机" name="mobile">
                            <a-input v-model:value="form.mobile" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="邮箱" name="email">
                            <a-input v-model:value="form.email" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="部门" name="dept">
                            <a-input v-model:value="form.dept" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="描述" name="note">
                            <a-textarea v-model:value="form.note" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, createVNode, h } from 'vue'
import Table from '/@/components/Table'
import Icon from '/@/components/Icon'
import { Modal } from 'ant-design-vue'
import { fetchUserPage, updateUser, createUser, getUser, removeUser } from '/@/apis/modules/user'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const columns = [
    { title: '登录名', dataIndex: 'username' },
    { title: '用户编号', dataIndex: 'userNo' },
    { title: '姓名', dataIndex: 'realName' },
    { title: '手机号', dataIndex: 'mobile' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '部门', dataIndex: 'dept' },
    { title: '描述', dataIndex: 'note' },
    { title: '操作', width: '160px', slots: { customRender: 'operation' } }
]

export default defineComponent({
    name: 'system-user',
    components: {
        Table,
        Icon
    },
    setup() {
        const visible = ref<boolean>(false)
        const form = ref<any>({})
        const terms = [
            {
                key: 'username',
                label: '用户名',
                component: 'Input'
            },
            {
                key: 'realName',
                label: '姓名',
                component: 'Input'
            }
        ]
        const tableRef = ref<any>(null)
        const loading = ref<boolean>(false)
        const ruleForm = ref()
        const submitLoading = ref<boolean>(false)
        const rules = reactive({
            username: { required: true }
        })

        const submitForm = () => {
            ruleForm.value
                .validate()
                .then(async () => {
                    submitLoading.value = true
                    const data = form.value
                    const res = await (data.id ? updateUser(data) : createUser(data))
                    submitLoading.value = false
                    if (!res) return
                    tableRef.value && tableRef.value.reload()
                    visible.value = false
                })
                .catch(() => null)
        }
        // modal关闭事件
        const modalAfterClose = () => {
            ruleForm.value.clearValidate()
            form.value = {}
        }
        const handle = async ({ id }: { id: string }) => {
            if (id) {
                const res = await getUser(id)
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
                    removeUser(id).then(() => {
                        tableRef.value!.reload()
                    })
                }
            })
        }
        return {
            loading,
            columns,
            handle,
            remove,
            visible,
            submitForm,
            ruleForm,
            rules,
            modalAfterClose,
            form,
            terms,
            tableRef,
            action: fetchUserPage
        }
    }
})
</script>

<style lang="less">
.levi-search-form {
    padding: 2px 16px;
    margin: 0 2px 10px;
    box-shadow: 0 0 5px 1px rgba(0, 21, 41, 0.08);
}
</style>
