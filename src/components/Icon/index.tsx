import type { PropType } from 'vue'
import { defineComponent, ref, watch, onMounted, nextTick, unref, computed, CSSProperties } from 'vue'
import Iconify from '@purge-icons/generated'
import { isString } from '@pinkbin/utils'
import { propTypes } from '/@/utils/propTypes'
export default defineComponent({
    name: 'LvIcon',
    props: {
        // icon name
        icon: propTypes.string,
        // icon color
        color: propTypes.string,
        // icon size
        size: {
            type: [String, Number] as PropType<string | number>,
            default: 16
        },
        prefix: propTypes.string.def(''),
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
        }
    },
    setup(props, { attrs }) {
        const elRef = ref<ElRef>(null)

        const getIconRef = computed(() => {
            const { icon, prefix } = props
            return `${prefix ? prefix + ':' : ''}${icon}`
        })

        const update = async () => {
            const el = unref(elRef)
            if (el) {
                await nextTick()
                const icon = unref(getIconRef)

                const svg = Iconify.renderSVG(icon, {})

                if (svg) {
                    el.textContent = ''
                    el.appendChild(svg)
                } else {
                    const span = document.createElement('span')
                    span.className = 'iconify'
                    span.dataset.icon = icon
                    el.textContent = ''
                    el.appendChild(span)
                }
            }
        }

        const wrapStyleRef = computed((): CSSProperties => {
            const { size, color } = props
            let fs = size
            if (isString(size)) {
                fs = parseInt(size, 10)
            }
            return {
                fontSize: `${fs}px`,
                color,
                display: 'inline-flex'
            }
        })

        watch(() => props.icon, update, { flush: 'post' })

        onMounted(update)

        return () => <div ref={elRef} onClick={props.onClick} class={[attrs.class, 'app-iconify anticon levi-icon']} style={unref(wrapStyleRef)} />
    }
})
