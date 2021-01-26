<template>
    <div>
        <lv-table ref="tableRef" title="角色管理" :columns="columns" :terms="terms" :action="action">
            <template #extra>
                <a-button type="primary" @click="handle()">
                    <template #icon> <lv-icon icon="ic:round-add-circle-outline" /></template>
                    <span>新增</span>
                </a-button>
            </template>
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="handle(record.id)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button type="link" size="small" @click="remove(record.id)">删除</a-button>
            </template>
        </lv-table>
        <lv-modal-form v-model:form="form" v-model:visible="visible" title="用户信息" :rules="rules" :column="1" @submit="submit">
            <a-form-item label="角色名称" name="roleName">
                <a-input v-model:value="form.roleName" />
            </a-form-item>
            <a-form-item label="角色描述" name="note">
                <a-textarea v-model:value="form.note" />
            </a-form-item>
        </lv-modal-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import type { Ref } from 'vue'
import { ModalFormType } from '/@/components/FormModal'
import useCRUD from '/@/hooks/useCRUD'
import { fetchRolePage, updateRole, createRole, getRole, removeRole } from '/@/apis/modules/role'

export default defineComponent({
    name: 'system-role',
    setup() {
        const columns = [
            { title: '角色名称', dataIndex: 'roleName', width: '40%' },
            { title: '角色描述', dataIndex: 'note' },
            { title: '操作', width: '160px', slots: { customRender: 'operation' } }
        ]
        const tableRef = ref<Nullable<Ref>>(null)
        const terms = [{ key: 'roleName', label: '角色名称', component: 'Input' }]
        const modelForm = reactive<ModalFormType>({
            visible: false,
            loading: false,
            rules: {
                roleName: { required: true, type: 'string', message: '请输入角色名称', trigger: 'blur' }
            },
            form: {}
        })
        const crud = useCRUD(
            modelForm,
            {
                C: createRole,
                R: getRole,
                U: updateRole,
                D: removeRole
            },
            tableRef
        )
        return {
            ...toRefs(modelForm),
            ...toRefs(crud),
            columns,
            terms,
            tableRef,
            action: fetchRolePage
        }
    }
})
</script>
