import { createVNode, h } from 'vue'
import type { Ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
interface ICRUD {
    /* create */
    C: Fn
    /* retrieve */
    R: Fn
    /* update */
    U: Fn
    /* delete */
    D: Fn
    /* retreieve callback */
    RC?: Fn
}
const useCRUD = (model: any, CRUD: ICRUD, tableRef?: Ref) => {
    const { C, U, R, D, RC } = CRUD
    const handle = async (id?: string) => {
        if (id) {
            const res = await R(id)
            if (!res) return
            model.form = res.data
        }
        typeof RC === 'function' && RC(model.form)
        model.visible = true
    }

    const remove = (id?: string) => {
        Modal.confirm({
            title: '提示',
            content: h('div', [h('p', '确定要删除当前数据吗?')]),
            icon: createVNode(ExclamationCircleOutlined),
            centered: true,
            async onOk() {
                D(id).then((res: any) => {
                    res && reload()
                })
            }
        })
    }

    const reload = () => {
        tableRef && tableRef.value && tableRef.value.reload()
    }

    const submit = async () => {
        model.loading = true
        const data = model.form
        const res = await (data.id ? U(data) : C(data))
        model.loading = false
        if (!res) return
        reload()
        model.visible = false
    }
    return {
        handle,
        remove,
        submit
    }
}

export default useCRUD
