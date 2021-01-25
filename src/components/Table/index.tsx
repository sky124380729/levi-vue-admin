import { defineComponent, onMounted, reactive, ref, unref, PropType } from 'vue'
import { PageHeader, Table, Tooltip } from 'ant-design-vue'
import Icon from '/@/components/Icon'
import Search from '/@/components/Search'
import { useExpose } from '/@/hooks/useExpose'
import './index.less'

interface Model {
    form: any
    terms: any
}
type OperationType = 'add' | 'edit' | 'delete'

export default defineComponent({
    name: 'Levi-Table',
    props: {
        title: String,
        subTitle: String,
        settings: Object,
        columns: Array,
        terms: {
            type: [Array, Object],
            default: null
        },
        action: {
            required: true,
            type: Function as PropType<(data: any) => any>
        },
        operation: {
            type: Array as PropType<OperationType[]>,
            default: []
        }
    },
    setup(props, { slots, attrs }) {
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
            if (typeof attrs.onAdd === 'function') {
                attrs.onAdd('sds')
            }
            if (id) {
                // const res = await getUser(id)
                // const res = null
                // if (!res) return
                // model.form = res.data
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

        const reload = () => {
            getList()
        }

        const getTableSlots = () => {
            const { extra, ...tableSlots } = slots
            return { ...tableSlots }
        }

        const getExtraSlots = () => {
            const extraSlots: any[] = []
            slots.extra && extraSlots.push(slots.extra())
            const hasAddBtn = props.operation.includes('add')
            hasAddBtn &&
                extraSlots.push(
                    <a-button type='primary' onClick={handle}>
                        {{
                            icon: () => <Icon icon='ic:round-add-circle-outline' />,
                            default: () => <span>新增</span>
                        }}
                    </a-button>
                )
            return () => extraSlots
        }

        const tableSettings = reactive<any>({
            bordered: false,
            striped: false,
            ellipsis: false
        })

        const setTable = (type: string) => {
            tableSettings[type] = !tableSettings[type]
        }

        const processColumns = (columns: any, globalEllipsis: boolean) => {
            return columns.map((v: any) => {
                const { ellipsis } = v
                return {
                    ...v,
                    ellipsis: typeof ellipsis === 'undefined' ? globalEllipsis : ellipsis
                }
            })
        }

        useExpose({
            reload
        })

        return () => {
            const { columns, terms, title, subTitle } = props
            const { ellipsis, striped, bordered } = tableSettings
            return (
                <PageHeader style='background-color: #fff;' title={title} subTitle={subTitle}>
                    {{
                        extra: getExtraSlots(),
                        default: () => (
                            <div class={['levi-table', { 'levi-table--striped': striped, 'levi-table--bordered': bordered }]}>
                                <div class='levi-table__header'>
                                    <div class='levi-table__search'>{terms && <Search terms={terms} onQuery={handleQuery}></Search>}</div>
                                    <div class='levi-table__action'>
                                        <Tooltip>
                                            {{
                                                default: () => <Icon icon={bordered ? 'mdi:border-all' : 'mdi:border-none'} onClick={() => setTable('bordered')} />,
                                                title: () => '边框'
                                            }}
                                        </Tooltip>
                                        <Tooltip>
                                            {{
                                                default: () => <Icon icon={striped ? 'mdi:view-stream' : 'mdi:view-stream-outline'} onClick={() => setTable('striped')} />,
                                                title: () => '条纹'
                                            }}
                                        </Tooltip>
                                        <Tooltip>
                                            {{
                                                default: () => <Icon icon={ellipsis ? 'uil:ellipsis-h' : 'ion:ellipsis-horizontal-circle'} onClick={() => setTable('ellipsis')} />,
                                                title: () => '超出省略'
                                            }}
                                        </Tooltip>
                                        <Tooltip>{{ default: () => <Icon icon='radix-icons:enter-full-screen' />, title: () => '全屏' }}</Tooltip>
                                        <Tooltip>{{ default: () => <Icon icon='ri:refresh-line' onClick={() => reload()} />, title: () => '刷新' }}</Tooltip>
                                    </div>
                                </div>
                                <div class='levi-table__body'>
                                    <Table
                                        rowKey='id'
                                        bordered={bordered}
                                        loading={unref(loading)}
                                        columns={processColumns(columns, ellipsis)}
                                        pagination={pagination}
                                        onChange={tableChange}
                                        dataSource={unref(data)}
                                    >
                                        {getTableSlots()}
                                    </Table>
                                </div>
                            </div>
                        )
                    }}
                </PageHeader>
            )
        }
    }
})
