<template>
    <div>
        <lv-table ref="tableRef" title="用户管理" :terms="terms" :columns="columns" :action="action">
            <template #extra>
                <a-button type="primary" @click="handle()">
                    <template #icon> <lv-icon icon="ic:round-add-circle-outline" /></template>
                    <span>新增</span>
                </a-button>
            </template>
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="handle(record.id)">编辑</a-button>
                <a-button type="link" size="small" @click="setRole(record.id)">选择角色</a-button>
                <a-button type="link" size="small" @click="remove(record.id)">删除</a-button>
            </template>
        </lv-table>

        <lv-modal-form v-model:visible="visible" v-model:form="form" :rules="rules" title="用户信息" @submit="submit">
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

        <a-modal v-model:visible="role.visible" title="设置角色" width="780px" @ok="submitRole">
            <lv-table :row-selection="rowSelection" :action="role.action" :terms="role.terms" :columns="role.columns"></lv-table>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import type { Ref } from 'vue'
import { ModalFormType } from '/@/components/FormModal'
import useCRUD from '/@/hooks/useCRUD'
import { fetchUserPage, updateUser, createUser, getUser, removeUser } from '/@/apis/modules/user'
import { fetchRolePage } from '/@/apis/modules/role'
import { getUserRole, updateUserRole } from '/@/apis/modules/userRole'

const columns = [
    { title: '登录名', dataIndex: 'username' },
    { title: '用户编号', dataIndex: 'userNo' },
    { title: '姓名', dataIndex: 'realName' },
    { title: '手机号', dataIndex: 'mobile' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '部门', dataIndex: 'dept' },
    { title: '描述', dataIndex: 'note' },
    { title: '操作', width: '200px', slots: { customRender: 'operation' } }
]

export default defineComponent({
    name: 'system-user',
    setup() {
        const terms = [
            { key: 'username', label: '用户名', component: 'Input' },
            { key: 'realName', label: '姓名', component: 'Input' }
        ]
        const modelForm = reactive<ModalFormType>({
            visible: false,
            loading: false,
            rules: {
                username: { required: true, type: 'string', message: '请输入用户名', trigger: 'blur' }
            },
            form: {}
        })
        const tableRef = ref<Nullable<Ref>>(null)

        const crud = useCRUD(
            modelForm,
            {
                C: createUser,
                R: getUser,
                U: updateUser,
                D: removeUser
            },
            tableRef
        )

        // 设置角色
        const role = reactive<any>({
            id: null,
            visible: false,
            selectedRowKeys: [],
            terms: [{ key: 'roleName', label: '角色名称', component: 'Input' }],
            columns: [
                { title: '角色名称', dataIndex: 'roleName' },
                { title: '角色描述', dataIndex: 'note', ellipsis: true }
            ],
            action: fetchRolePage
        })
        const setRole = async (id: string) => {
            role.id = id
            role.visible = true
            const res = await getUserRole(id)
            rowSelection.selectedRowKeys = res ? res.data.map((v: any) => v.roleId) : []
        }
        const rowSelection = reactive<any>({
            selectedRowKeys: [],
            onChange: (selectedRowKeys: string[]) => {
                rowSelection.selectedRowKeys = selectedRowKeys
            }
        })
        const submitRole = async () => {
            const res = await updateUserRole(role.id, rowSelection.selectedRowKeys)
            if (!res) return
            role.visible = false
            tableRef.value && tableRef.value.reload()
        }

        return {
            ...toRefs(modelForm),
            ...crud,
            columns,
            terms,
            tableRef,
            action: fetchUserPage,
            role,
            submitRole,
            setRole,
            rowSelection
        }
    }
})
</script>
