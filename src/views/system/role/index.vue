<template>
    <div>
        <lv-table ref="tableRef" title="角色管理" :columns="columns" :terms="terms" :action="action" @create="handle()">
            <template #operation="{ record }">
                <a-button type="link" size="small" @click="handle(record.id)">编辑</a-button>
                <a-button type="link" size="small" @click="setResource(record.id)">设置菜单</a-button>
                <a-button type="link" size="small" @click="remove(record.id)">删除</a-button>
            </template>
        </lv-table>

        <lv-modal-form v-model:form="form" v-model:visible="visible" :schemas="schemas" title="用户信息" :rules="rules" :column="1" @submit="submit" />

        <a-modal v-model:visible="resource.visible" title="资源设置" destroy-on-close @ok="submitRole">
            <a-tree v-model:checkedKeys="resource.checkedKeys" :replace-fields="replaceFields" checkable :tree-data="resource.data" @check="onCheck"> </a-tree>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import type { Ref } from 'vue'
import useCRUD from '/@/hooks/useCRUD'
import { fetchRolePage, updateRole, createRole, getRole, removeRole } from '/@/apis/modules/role'
import { getMenuTree } from '/@/apis/modules/menu'
import { updateRoleMenu, getRoleMenu } from '/@/apis/modules/roleMenu'

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
        const modelForm = reactive({
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

        const schemas = ref([
            { key: 'roleName', label: '角色名称', component: 'Input' },
            { key: 'note', label: '角色描述', component: 'InputTextArea' }
        ])
        onMounted(() => {
            getAllMenu()
        })
        // 资源
        const resource = reactive<any>({
            id: null,
            visible: false,
            data: [],
            checkedKeys: []
        })
        const replaceFields = {
            key: 'id'
        }
        const getAllMenu = async () => {
            const res = await getMenuTree()
            resource.data = res ? res.data : []
        }
        const setResource = async (id: string) => {
            resource.id = id
            resource.visible = true
            const res = await getRoleMenu(id)
            const keys = res ? res.data.map((v: any) => v.resourceId) : []
            resource.checkedKeys = keys
        }

        const submitRole = async () => {
            const res = await updateRoleMenu(resource.id, resource.checkedKeys)
            if (!res) return
            resource.visible = false
        }

        const onCheck = (checkedKeys: any[]) => {
            resource.checkedKeys = checkedKeys
        }

        return {
            ...toRefs(modelForm),
            ...crud,
            schemas,
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
