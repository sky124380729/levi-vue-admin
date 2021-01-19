import { defineComponent, onMounted, reactive, ref, unref, PropType } from 'vue'
// import type { PropType } from 'vue'
import { PageHeader, Spin, Table } from 'ant-design-vue'
import Icon from '/@/components/Icon'
import Search from '/@/components/Search'
import './index.less'

// import { fetchUserPage, updateUser, createUser, getUser, removeUser } from '/@/apis/modules/user'

interface Model {
    form: any
    terms: any
}

export default defineComponent({
    name: 'Levi-Table',
    props: {
        title: String,
        settings: Object,
        columns: Array,
        terms: [Array, Object],
        action: {
            required: true,
            type: Function as PropType<(data: any) => any>
        }
    },
    setup(props) {
        const loading = ref<boolean>(false)
        const data = ref([])
        const model = reactive<Model>({
            form: {},
            terms: {}
        })
        // 分页属性
        const pagination = reactive({
            size: 'default',
            showSizeChanger: true,
            defaultCurrent: 1,
            current: 1,
            pageSize: 10,
            total: 0,
            showTotal(total: number) {
                return `共 ${total} 条`
            }
        })
        const getList = async () => {
            const { current, pageSize: size } = pagination
            loading.value = true
            const res = await props.action({ current, size, query: model.terms })
            loading.value = false
            if (!res) return
            const { total, records } = res.data
            data.value = records
            pagination.total = total
        }
        const tableChange = (p: any) => {
            const { current, pageSize } = p
            pagination.current = current
            pagination.pageSize = pageSize
            getList()
        }

        const handle = async ({ id }: { id: string }) => {
            if (id) {
                // const res = await getUser(id)
                const res = null
                if (!res) return
                model.form = res.data
            }
            // visible.value = true
        }
        onMounted(() => {
            getList()
        })

        const handleQuery = (terms: any) => {
            model.terms = terms
            getList()
        }

        return () => {
            return (
                <PageHeader style='background-color: #fff' title={props.title}>
                    {{
                        extra: () => (
                            <a-button type='primary' onClick={handle}>
                                {{
                                    icon: () => <Icon icon='ic:round-add-circle-outline'></Icon>,
                                    default: () => <span>新增</span>
                                }}
                            </a-button>
                        ),
                        default: () => (
                            <Spin spinning={unref(loading)}>
                                <div class='levi-table'>
                                    <div class='levi-table__header'>
                                        <Search terms={props.terms} onQuery={handleQuery}></Search>
                                        <div>settings</div>
                                    </div>
                                    <div class='levi-table__body'>
                                        <Table rowKey='id' columns={props.columns} pagination={pagination} onChange={tableChange} dataSource={unref(data)}></Table>
                                    </div>
                                </div>
                            </Spin>
                        )
                    }}
                </PageHeader>
            )
        }
    }
})
