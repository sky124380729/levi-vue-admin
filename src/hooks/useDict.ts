import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

const useDict = (dict: string, val: string | number) => {
    const dictMap: Record<string, any> = useStore().state.dict
    const item = dictMap[dict]
    if (!item) {
        return message.error(`unknown dict ===== ${dict} ===== , please check it`)
    }
    return item[val]
}

export default useDict
