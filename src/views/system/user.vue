<template>
    <div>
        <lv-table ref="tableRef" title="用户管理" :terms="terms" :columns="columns" :action="action" @create="handle()">
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="setRole(record.id)">选择角色</a-button>
                <a-button type="link" size="small" @click="remove(record.id)">删除</a-button>
            </template>
        </lv-table>

        <lv-modal-form v-model:visible="visible" v-model:form="form" :label-width="90" :schemas="schemas" :rules="rules" title="用户信息" @submit="submit" />

        <a-modal v-model:visible="role.visible" title="设置角色" width="780px" @ok="submitRole">
            <lv-table :row-selection="rowSelection" :action="role.action" :terms="role.terms" :columns="role.columns"></lv-table>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import type { Ref } from 'vue'
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
        const modelForm = reactive({
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

        const schemas = ref([
            {
                key: 'username',
                label: '登录名',
                component: 'Input',
                props: {
                    disabled: computed(() => !!modelForm.form.id)
                }
            },
            { key: 'userNo', label: '用户编号', component: 'Input' },
            { key: 'realName', label: '姓名', component: 'Input' },
            {
                key: 'password',
                label: '密码',
                component: 'Input',
                props: {
                    type: 'password'
                },
                show: computed(() => !modelForm.form.id)
            },
            {
                key: 'confirmPassword',
                label: '确认密码',
                component: 'Input',
                props: {
                    type: 'password'
                },
                show: computed(() => !modelForm.form.id)
            },
            { key: 'mobile', label: '手机', component: 'Input' },
            { key: 'email', label: '邮箱', component: 'Input' },
            { key: 'dept', label: '部门', component: 'Input' },
            { key: 'note', label: '描述', component: 'InputTextArea' }
        ])

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
            schemas,
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
