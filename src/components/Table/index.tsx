/* eslint-disable no-unused-vars */
import { defineComponent, reactive, ref, unref, PropType, computed } from 'vue'
import { Button, Table, Tooltip } from 'ant-design-vue'
import type { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { LvIcon, LvSearch, LvPage } from '/@/components'
import { useInCacheFn } from '@pinkbin/vue-hooks'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import './index.less'

interface Model {
    form: Recordable
    terms: Recordable
}
type OperationType = 'add' | 'edit' | 'delete'

type LeviColumnProps = ColumnProps & {
    dict: boolean
}

export interface TableFormat {
    /** 请求的方法 */
    fn: Fn
    /** 请求查询参数的转换 */
    formatReq?: Fn
    /** 请求返回的数据处理 */
    formatRes?: Fn
}

export default defineComponent({
    name: 'LvTable',
    inheritAttrs: false,
    props: {
        action: {
            required: true,
            type: [Object, Function] as PropType<TableFormat | Fn>
        },
        rowKey: {
            type: [String, Function],
            default: 'id'
        },
        title: {
            type: String as PropType<string>
        },
        subTitle: {
            type: String as PropType<string>
        },
        columns: {
            type: Array as PropType<LeviColumnProps[]>,
            default: () => []
        },
        terms: {
            type: [Array, Object],
            default: null
        },
        pageAble: {
            type: Boolean as PropType<boolean>,
            default: true
        },
        operation: {
            type: Array as PropType<OperationType[]>,
            default: () => []
        }
    },
    setup(props, { slots, attrs, expose }) {
        const dictMap: Record<string, any> = useStore().state.dict
        const loading = ref<boolean>(false)
        const data = ref([])
        const tableRef = ref<Nullable<HTMLElement>>(null)
        const { toggle, isFullscreen } = useFullscreen(tableRef)
        const model = reactive<Model>({
            form: {},
            terms: {}
        })

        useInCacheFn(() => {
            getList()
        })

        // 分页属性
        const pagination = props.pageAble
            ? reactive({
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
            : false

        const getList = async () => {
            // 包含分页的情况，要根据接口的返回情况修改
            if (pagination) {
                const { current, pageSize: size } = pagination
                loading.value = true
                let res
                if (typeof props.action === 'function') {
                    res = await props.action({ current, size, query: model.terms })
                } else {
                    const { fn, formatReq, formatRes } = props.action
                    let query = model.terms
                    if (formatReq) {
                        query = formatReq(query)
                    }
                    res = await fn({ current, size, query })
                    if (formatRes && res) {
                        const {
                            data: { records }
                        } = res
                        res.data.records = formatRes(records)
                    }
                }
                loading.value = false
                if (res && res.data) {
                    const { total, records } = res.data
                    data.value = records
                    pagination.total = total
                } else {
                    data.value = []
                    pagination.total = 0
                }
            } else {
                // 没有分页的情况，要根据接口的返回情况修改
                loading.value = true
                const res = await (props.action as Fn)(model.terms)
                loading.value = false
                data.value = res ? res.data : []
            }
        }

        const tableChange = (p: any) => {
            if (pagination) {
                const { current, pageSize } = p
                pagination.current = current
                pagination.pageSize = pageSize
                getList()
            }
        }

        const tableSettings = reactive<any>({
            bordered: false,
            striped: false,
            ellipsis: true,
            indexed: true,
            fullscreen: computed({
                get() {
                    return isFullscreen.value
                },
                set() {
                    toggle()
                }
            })
        })

        const handleQuery = (terms: any) => {
            model.terms = terms
            getList()
        }

        const reload = () => {
            getList()
        }

        const getTableSlots = () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { extra, ...tableSlots } = slots
            return { ...tableSlots }
        }

        // if there is create function, add create button default
        const getExtraSlots = () => {
            const extraSlots: any[] = []
            slots.extra && extraSlots.push(slots.extra())
            const { onCreate } = attrs
            typeof onCreate === 'function' &&
                extraSlots.push(
                    <Button type='primary' shape='round' onClick={(...args) => onCreate.apply(this, ...args)}>
                        {{
                            icon: () => <LvIcon icon='gridicons:create' />,
                            default: () => <span>create</span>
                        }}
                    </Button>
                )
            return () => extraSlots
        }

        const setTable = (type: keyof typeof tableSettings) => {
            tableSettings[type] = !tableSettings[type]
        }

        /**
         * 处理原始columns,根据传入的ellipsis和indexed来改变渲染内容
         */
        const processColumns = (columns: any, globalEllipsis: boolean, indexed: boolean) => {
            const processedCols = columns.map((v: LeviColumnProps) => {
                const { ellipsis, dataIndex, dict } = v
                return {
                    ...v,
                    customRender: dict ? ({ text }: any) => <span>{typeof dict === 'string' ? dictMap[dict][text] : dictMap[dataIndex!][text]}</span> : void 0,
                    ellipsis: typeof ellipsis === 'undefined' ? globalEllipsis : ellipsis
                }
            })
            if (indexed) {
                processedCols.unshift({
                    title: '序号',
                    width: '65px',
                    align: 'center',
                    customRender({ index }: { index: number }) {
                        return index + 1
                    }
                })
            }
            return processedCols
        }

        const renderActions = () => {
            const actions = [
                { title: '索引', filed: 'indexed', iconActive: 'mdi:format-list-numbered', iconDeactive: 'mdi:format-list-bulleted' },
                { title: '边框', filed: 'bordered', iconActive: 'mdi:border-all', iconDeactive: 'mdi:border-none' },
                { title: '条纹', filed: 'striped', iconActive: 'mdi:view-stream', iconDeactive: 'mdi:view-stream-outline' },
                { title: '超出省略', filed: 'ellipsis', iconActive: 'mdi:code-brackets', iconDeactive: 'mdi:code-json' },
                { title: '全屏', filed: 'fullscreen', iconActive: 'mdi:fullscreen-exit', iconDeactive: 'mdi:fullscreen' }
            ]
            return actions.map((action) => (
                <Tooltip>
                    {{
                        default: () => <LvIcon icon={tableSettings[action.filed] ? action.iconActive : action.iconDeactive} onClick={() => setTable(action.filed)} />,
                        title: () => action.title
                    }}
                </Tooltip>
            ))
        }

        const renderTable = () => {
            const { columns, terms, rowKey } = props
            const { ellipsis, striped, bordered, indexed } = tableSettings
            return (
                <div ref={tableRef} class={['levi-table', { 'levi-table--striped': striped, 'levi-table--bordered': bordered }]}>
                    <div class='levi-table__header'>
                        <div class='levi-table__search'>{terms && <LvSearch terms={terms} onQuery={handleQuery}></LvSearch>}</div>
                        <div class='levi-table__action'>
                            {renderActions()}
                            <Tooltip>{{ default: () => <LvIcon icon='ri:refresh-line' onClick={() => reload()} />, title: () => '刷新' }}</Tooltip>
                        </div>
                    </div>
                    <div class='levi-table__body'>
                        <Table
                            {...attrs}
                            rowKey={rowKey}
                            bordered={bordered}
                            loading={unref(loading)}
                            columns={processColumns(columns, ellipsis, indexed)}
                            pagination={pagination}
                            onChange={tableChange}
                            dataSource={unref(data)}
                        >
                            {getTableSlots()}
                        </Table>
                    </div>
                </div>
            )
        }

        expose({
            reload
        })

        return () => {
            const { title, subTitle } = props
            return title || subTitle ? (
                <LvPage title={title} subTitle={subTitle}>
                    {{
                        header: getExtraSlots(),
                        content: () => renderTable()
                    }}
                </LvPage>
            ) : (
                renderTable()
            )
        }
    }
})

// 用于table的数据处理
export const useTransformAction = (config: TableFormat) => (o: Pagination) => {
    const { size, current } = o
    let { query } = o
    const { fn, formatReq, formatRes } = config
    if (typeof formatReq === 'function') {
        query = formatReq(query)
    }
    return fn.call(void 0, { size, current, query }).then((res: ResponseData) => {
        if (res && typeof formatRes === 'function') {
            const {
                data: { records }
            } = res
            res.data.records = formatRes(records)
        }
        return res
    })
}
