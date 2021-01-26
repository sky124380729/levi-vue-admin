import { createVNode, h } from 'vue'
import type { Ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { ModalFormType } from '/@/components/FormModal'
interface ICRUD {
    /* create */
    C: Fn
    /* retrieve */
    R: Fn
    /* update */
    U: Fn
    /* delete */
    D: Fn
}
const useCRUD = (model: ModalFormType, CRUD: ICRUD, tableRef?: Ref) => {
    const { C, U, R, D } = CRUD
    const handle = async (id?: string) => {
        if (id) {
            const res = await R(id)
            if (!res) return
            model.form = res.data
        }
        model.visible = true
    }

    const remove = (id?: string) => {
        Modal.confirm({
            title: '提示',
            content: h('div', { style: 'color:#f56c6c' }, [h('p', '确定要删除当前数据吗?')]),
            icon: createVNode(ExclamationCircleOutlined),
            onOk() {
                D(id).then(() => {
                    reload()
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
