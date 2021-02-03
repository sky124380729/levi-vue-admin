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
                <a-button type="link" size="small" @click="setResource(record.id)">设置菜单</a-button>
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

        <a-modal v-model:visible="resource.visible" title="资源设置" destroy-on-close @ok="submitRole">
            <a-tree
                v-model:checkedKeys="resource.checkedKeys"
                v-model:expandedKeys="resource.expandedKeys"
                :replace-fields="replaceFields"
                checkable
                :tree-data="resource.data"
                @check="onCheck"
            >
            </a-tree>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import type { Ref } from 'vue'
import { ModalFormType } from '/@/components/FormModal'
import useCRUD from '/@/hooks/useCRUD'
import { fetchRolePage, updateRole, createRole, getRole, removeRole } from '/@/apis/modules/role'
import { getResourceTree } from '/@/apis/modules/resource'
import { updateRoleResource, getRoleResource } from '/@/apis/modules/roleResource'

export default defineComponent({
    name: 'system-role',
    setup() {
        const columns = [
            { title: '角色名称', dataIndex: 'roleName', width: '40%' },
            { title: '角色描述', dataIndex: 'note' },
            { title: '操作', width: '200px', slots: { customRender: 'operation' } }
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

        onMounted(() => {
            getAllMenu()
        })
        // 资源
        const resource = reactive<any>({
            id: null,
            visible: false,
            data: [],
            checkedKeys: [],
            expandedKeys: []
        })
        const replaceFields = {
            key: 'id'
        }
        const getAllMenu = async () => {
            const res = await getResourceTree()
            resource.data = res ? res.data : []
        }
        const setResource = async (id: string) => {
            resource.id = id
            resource.visible = true
            const res = await getRoleResource(id)
            const keys = res ? res.data.map((v: any) => v.resourceId) : []
            resource.checkedKeys = keys
            resource.expandedKeys = keys
        }

        const submitRole = async () => {
            const res = await updateRoleResource(resource.id, resource.checkedKeys)
            if (!res) return
            resource.visible = false
            tableRef.value && tableRef.value.reload()
        }

        const onCheck = (checkedKeys: any[]) => {
            resource.checkedKeys = checkedKeys
        }

        return {
            ...toRefs(modelForm),
            ...crud,
            columns,
            terms,
            tableRef,
            action: fetchRolePage,
            resource,
            setResource,
            replaceFields,
            onCheck,
            submitRole
        }
    }
})
</script>
