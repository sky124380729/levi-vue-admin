import { reactive, toRefs } from 'vue'
import axios from 'axios'
import type { AxiosError } from 'axios'

interface IData<T> {
    result: T | null
    loading: boolean
    loaded: boolean
    error: AxiosError | null
}

function useURLLoader<T>(url: string) {
    const data: IData<T> = reactive({
        result: null,
        loading: true,
        loaded: false,
        error: null
    })
    axios
        .get(url)
        .then((res) => {
            data.result = res.data
            data.loaded = true
            data.loading = false
        })
        .catch((err) => {
            data.error = err
            data.loading = false
        })

    return toRefs(data)
}

export default useURLLoader
