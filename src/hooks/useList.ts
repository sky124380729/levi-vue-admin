import { ref, onMounted } from 'vue'
const useList = (action: Fn, labelKey?: string, valueKey = 'id') => {
    const list = ref<any[]>([])
    const transformRes = (res: any) => {
        if (!res) {
            return []
        } else {
            if (labelKey && valueKey) {
                return res.data.map((v: any) => ({
                    label: v[labelKey],
                    value: v[valueKey]
                }))
            } else {
                return res.data
            }
        }
    }
    onMounted(async () => {
        const res = await action()
        list.value = res ? transformRes(res) : []
    })
    return list
}
export default useList
