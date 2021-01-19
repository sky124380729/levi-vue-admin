<template>
    <Table title="角色管理" :terms="terms" :columns="columns" :action="action" :operation="['add']">
        <template #operation>
            <a-button type="link" size="small">编辑</a-button>
            <a-divider type="vertical" />
            <a-button type="link" size="small">删除</a-button>
        </template>
    </Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Table from '/@/components/Table'
import Icon from '/@/components/Icon'
import { fetchRolePage } from '/@/apis/modules/role'

export default defineComponent({
    name: 'system-role',
    components: {
        Table,
        Icon
    },
    setup() {
        const columns = [
            { title: '角色名称', dataIndex: 'roleName', width: '40%' },
            { title: '角色描述', dataIndex: 'note', ellipsis: true },
            { title: '操作', width: '160px', slots: { customRender: 'operation' } }
        ]
        const terms = [
            {
                key: 'roleName',
                label: '角色名称',
                component: 'Input'
            }
        ]
        return {
            columns,
            terms,
            action: fetchRolePage
        }
    }
})
</script>
