import { createVNode, h } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { ModalFormType } from '/@/components/FormModal'
const useCRUD = (model: ModalFormType) => {
    const remove = (id: string): void => {
        Modal.confirm({
            title: '提示',
            content: h('div', { style: 'color:#f56c6c' }, [h('p', '确定要删除当前数据吗?')]),
            okButtonProps: {
                loading: model.loading
            },
            icon: createVNode(ExclamationCircleOutlined),
            onOk() {}
        })
    }
    return {
        remove
    }
}

export default useCRUD
