<template>
    <div>
        <lv-table ref="tableRef" title="数据字典" :columns="columns" :terms="terms" :action="action"> </lv-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import type { Ref } from 'vue'
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
        return {
            ...toRefs(modelForm),
            ...crud,
            columns,
            terms,
            tableRef,
            action: fetchRolePage
        }
    }
})
</script>
