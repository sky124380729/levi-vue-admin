<template>
    <div>
        <a-page-header style="background-color: #fff" title="用户管理">
            <template #extra>
                <a-button type="primary" @click="handle">
                    <template #icon><Icon icon="ion:add-outline"></Icon></template>
                    新增
                </a-button>
            </template>
            <a-descriptions size="small" :column="3">
                <a-descriptions-item label="Created"> Lili Qu </a-descriptions-item>
                <a-descriptions-item label="Association">
                    <a>421421</a>
                </a-descriptions-item>
            </a-descriptions>
        </a-page-header>
        <a-table row-key="id" :columns="columns" :data-source="data" borderd size="middle" :pagination="pagination" align="center" @change="tableChange">
            <template #operation="{ _, record }">
                <a-button type="link" size="small" @click="handle(record)">编辑</a-button>
                <a-divider type="vertical" />
                <a-button type="link" size="small" @click="remove(record)">删除</a-button>
            </template>
        </a-table>

        <a-modal v-model:visible="visible" title="用户信息" ok-text="确认" cancel-text="取消" width="720px" :after-close="modalAfterClose" @ok="submitForm">
            <a-form ref="ruleForm" :model="model" :rules="rules" label-align="right" scroll-to-first-error :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                <a-row>
                    <a-col :span="12">
                        <a-form-item label="登录名" name="username">
                            <a-input v-model:value="model.username" :disabled="!!model.id" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="用户编号" name="userNo">
                            <a-input v-model:value="model.userNo" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="姓名" name="realName">
                            <a-input v-model:value="model.realName" />
                        </a-form-item>
                    </a-col>
                    <template v-if="!model.id">
                        <a-col :span="12">
                            <a-form-item label="密码" name="password">
                                <a-input v-model:value="model.password" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="确认密码" name="confirmPassword">
                                <a-input v-model:value="model.confirmPassword" />
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :span="12">
                        <a-form-item label="手机" name="mobile">
                            <a-input v-model:value="model.mobile" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="邮箱" name="email">
                            <a-input v-model:value="model.email" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="部门" name="dept">
                            <a-input v-model:value="model.dept" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="描述" name="note">
                            <a-textarea v-model:value="model.note" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, createVNode, h, unref } from 'vue'
import Icon from '/@/components/Icon'
import { Modal } from 'ant-design-vue'
import { fetchUserPage, updateUser, createUser, getUser, removeUser } from '/@/apis/modules/user'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const columns = [
    { title: '登录名', dataIndex: 'username' },
    { title: '用户编号', dataIndex: 'userNo' },
    { title: '姓名', dataIndex: 'realName' },
    { title: '手机号', dataIndex: 'mobile' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '部门', dataIndex: 'dept' },
    { title: '描述', dataIndex: 'note' },
    { title: '操作', width: '160px', dataIndex: 'id', slots: { customRender: 'operation' } }
]

export default defineComponent({
    name: 'system-user',
    components: {
        Icon
    },
    setup() {
        const data = ref<any>([])
        const visible = ref<boolean>(false)
        let model = reactive<any>({})
        const ruleForm = ref()
        const submitLoading = ref<boolean>(false)
        const rules = reactive({
            username: { required: true }
        })
        const pagination = reactive({
            size: 'default',
            showSizeChanger: true,
            defaultCurrent: 1,
            current: 1,
            pageSize: 10,
            total: 0,
            showTotal(total: number) {
                return total
            }
        })
        const tableChange = (p: any) => {
            const { current, pageSize } = p
            pagination.current = current
            pagination.pageSize = pageSize
            getList()
        }
        const getList = async () => {
            const { current, pageSize: size } = pagination
            const res = await fetchUserPage({ current, size })
            const { total, records } = res
            data.value = records
            pagination.total = total
        }

        const submitForm = () => {
            ruleForm.value
                .validate()
                .then(async () => {
                    submitLoading.value = true
                    const data = unref(model)
                    const id = data.id
                    const res = await (id ? updateUser(data) : createUser(data))
                    submitLoading.value = false
                    if (!res) return
                    getList()
                    visible.value = false
                })
                .catch(() => null)
        }
        // modal关闭事件
        const modalAfterClose = () => {
            ruleForm.value.clearValidate()
            Object.keys(model).forEach((key) => {
                delete model[key]
            })
        }
        const handle = async ({ id }) => {
            if (id) {
                const res = await getUser(id)
                if (!res) return
                Object.keys(res).forEach((key) => {
                    model[key] = res[key]
                })
            }
            visible.value = true
        }
        const remove = ({ id }: { id: string }) => {
            Modal.confirm({
                title: '提示',
                content: h('div', { style: 'color:#f56c6c' }, [h('p', '确定要删除当前数据吗?')]),
                okText: '确定',
                cancelText: '取消',
                okButtonProps: {
                    loading: submitLoading
                },
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    removeUser(id).then(() => {
                        getList()
                    })
                }
            })
        }
        onMounted(() => {
            getList()
        })
        return {
            data,
            columns,
            pagination,
            tableChange,
            handle,
            remove,
            visible,
            submitForm,
            model,
            ruleForm,
            rules,
            modalAfterClose
        }
    }
})
</script>
