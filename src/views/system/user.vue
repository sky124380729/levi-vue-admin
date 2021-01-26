<template>
    <div>
        <lv-table ref="tableRef" title="用户管理" :terms="terms" :columns="columns" :action="action">
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
        </lv-table>

        <lv-modal-form v-model:visible="visible" v-model:form="form" :rules="rules" title="用户信息" @submit="submitForm">
            <a-form-item label="登录名" name="username">
                <a-input v-model:value="form.username" :disabled="!!form.id" />
            </a-form-item>
            <a-form-item label="用户编号" name="userNo">
                <a-input v-model:value="form.userNo" />
            </a-form-item>
            <a-form-item label="姓名" name="realName">
                <a-input v-model:value="form.realName" />
            </a-form-item>
            <template v-if="!form.id">
                <a-form-item label="密码" name="password">
                    <a-input v-model:value="form.password" />
                </a-form-item>
                <a-form-item label="确认密码" name="confirmPassword">
                    <a-input v-model:value="form.confirmPassword" />
                </a-form-item>
            </template>
            <a-form-item label="手机" name="mobile">
                <a-input v-model:value="form.mobile" />
            </a-form-item>
            <a-form-item label="邮箱" name="email">
                <a-input v-model:value="form.email" />
            </a-form-item>
            <a-form-item label="部门" name="dept">
                <a-input v-model:value="form.dept" />
            </a-form-item>
            <a-form-item label="描述" name="note">
                <a-textarea v-model:value="form.note" />
            </a-form-item>
        </lv-modal-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, createVNode, h, toRefs } from 'vue'
import { ModalFormType } from '/@/components/FormModal'
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
        Icon
    },
    setup() {
        const terms = [
            { key: 'username', label: '用户名', component: 'Input' },
            { key: 'realName', label: '姓名', component: 'Input' }
        ]
        const model = reactive<ModalFormType>({
            visible: false,
            loading: false,
            rules: {
                username: { required: true, message: '请输入用户名', trigger: 'blur' }
            },
            form: {}
        })
        const tableRef = ref<any>(null)

        const reload = () => {
            tableRef.value && tableRef.value.reload()
        }

        const submitForm = async () => {
            model.loading = true
            const data = model.form
            const res = await (data.id ? updateUser(data) : createUser(data))
            model.loading = false
            if (!res) return
            reload()
            model.visible = false
        }
        const handle = async ({ id }: { id: string }) => {
            if (id) {
                const res = await getUser(id)
                if (!res) return
                model.form = res.data
            }
            model.visible = true
        }

        const remove = ({ id }: { id: string }) => {
            Modal.confirm({
                title: '提示',
                content: h('div', { style: 'color:#f56c6c' }, [h('p', '确定要删除当前数据吗?')]),
                okButtonProps: {
                    loading: model.loading
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
            ...toRefs(model),
            columns,
            handle,
            remove,
            submitForm,
            terms,
            tableRef,
            action: fetchUserPage
        }
    }
})
</script>
