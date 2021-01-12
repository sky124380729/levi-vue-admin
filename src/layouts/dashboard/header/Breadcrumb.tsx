import { ref, watchEffect, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'
export default defineComponent({
    name: 'Breadcrumb',
    setup() {
        const breadList = ref<any[]>([])
        const { push, currentRoute } = useRouter()
        const handleLinkClick = (e: MouseEvent) => {
            e.preventDefault()
            push('/')
        }
        watchEffect(() => {
            const { matched } = currentRoute.value
            breadList.value = matched.reduce(
                (prev, curr) => {
                    const { name, meta = {} } = curr
                    const { title, hidden } = meta
                    if (title && name !== 'homepage' && !hidden) {
                        prev.push({ name: curr.name as string, title })
                    }
                    return prev
                },
                [{ name: 'homepage', title: '首页' }]
            )
        })
        return () => {
            return (
                <Breadcrumb>
                    {{
                        default: () =>
                            breadList.value.map(({ name, title }) => (
                                <Breadcrumb.Item key={name}>{() => (name === 'homepage' ? <a onClick={handleLinkClick}>{title}</a> : <span>{title}</span>)}</Breadcrumb.Item>
                            ))
                    }}
                </Breadcrumb>
            )
        }
    }
})
