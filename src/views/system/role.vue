<template>
    <Table title="角色管理" :terms="terms" :columns="columns"> </Table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Table from '/@/components/Table'

export default defineComponent({
    name: 'system-role',
    components: {
        Table
    },
    setup() {
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
        const terms = {
            size: 'large',
            showLabel: true,
            terms: [
                {
                    key: 'username',
                    label: '姓名',
                    comp: 'Input',
                    slots: {
                        prefix: () => '￥'
                    },
                    props: {
                        allowClear: true
                    }
                },
                {
                    key: 'code',
                    label: '编号',
                    comp: 'Select',
                    props: {
                        options: [
                            { label: 'kkk', value: '111' },
                            { label: 'mmm', value: '222' }
                        ]
                    }
                }
            ]
        }
        return {
            columns,
            terms
        }
    }
})
</script>
