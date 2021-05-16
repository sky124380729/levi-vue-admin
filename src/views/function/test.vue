<template>
    <section>
        <m-table ref="mTable" title="未定义" :fetch-data="fetchIndexPage" :query-arr="queryArr">
            <template #buttons>
                <el-button plain type="primary" icon="el-icon-plus" size="mini" @click="handle()">新增</el-button>
            </template>
            <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="编号" prop="code"></el-table-column>
            <el-table-column label="备注" prop="remarks" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button type="text" @click="handle(row.id)">编辑</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>
        <m-dialog v-model:model="model" v-model:visible="modelVisible" :rules="rules" :submit-loading="submitLoading" label-width="110px" title="未定义" @submit="submit">
            <el-form-item label="名称：" prop="name">
                <m-input v-model="model.name"></m-input>
            </el-form-item>
            <el-form-item label="编号：" prop="code">
                <m-input v-model="model.code"></m-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
                <m-input v-model="model.remarks" type="textarea"></m-input>
            </el-form-item>
        </m-dialog>
    </section>
</template>

<script>
import { createIndex, removeIndex, updateIndex, getIndex, fetchIndexPage } from 'apis/elder'
export default {
    name: 'index',
    data() {
        return {
            fetchIndexPage,
            model: {},
            submitLoading: false,
            modelVisible: false,
            rules: {
                name: { required: true, message: '此项为必填项', trigger: 'blur' },
                code: { required: true, message: '此项为必填项', trigger: 'blur' }
            },
            queryArr: [{ key: 'name', tag: 'el-input', label: '名称' }]
        }
    },
    methods: {
        async handle(id) {
            if (id) {
                const res = await getIndex(id)
                if (!res) return
                this.model = res.content
            }
            this.modelVisible = true
        },
        async submit() {
            const id = this.model.id
            this.submitLoading = true
            const res = await (id ? updateIndex(id, this.model) : createIndex(this.model))
            this.submitLoading = false
            if (!res) return
            this.$refs.mTable.refresh()
            this.modelVisible = false
        },
        remove(id) {
            this.$confirm('确认要删除吗?', '提示', {
                type: 'error'
            })
                .then(() => {
                    removeIndex(id).then(() => {
                        this.$refs.mTable.refresh()
                    })
                })
                .catch(() => {})
        }
    }
}
</script>
