<template>
    <div>
        <lv-table ref="tableRef" title="用户管理" :terms="terms" :columns="columns" :action="action">
            <template #extra>
                <a-button type="primary" @click="handle()">
                    <template #icon>
                        <lv-icon icon="ic:round-add-circle-outline">新增</lv-icon>
                    </template>
                </a-button>
            </template>
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="handle(record.id)">编辑</a-button>
                <a-divider type="vertical" />
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
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { ModalFormType } from '/@/components/FormModal'
import useCRUD from '/@/hooks/useCRUD'
import { fetchUserPage, updateUser, createUser, getUser, removeUser } from '/@/apis/modules/user'

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
    setup() {
        const terms = [
            { key: 'username', label: '用户名', component: 'Input' },
            { key: 'realName', label: '姓名', component: 'Input' }
        ]
        const modelForm = reactive<ModalFormType>({
            visible: false,
            loading: false,
            rules: {
                username: { required: true, message: '请输入用户名', trigger: 'blur' }
            },
            form: {}
        })
        const tableRef = ref<any>(null)

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
        return {
            ...toRefs(modelForm),
            ...toRefs(crud),
            columns,
            terms,
            tableRef,
            action: fetchUserPage
        }
    }
})
</script>
