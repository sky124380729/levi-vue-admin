import { defineComponent } from 'vue'
import { LvIcon } from '/@/components'

export default defineComponent({
    name: 'Tag',
    inheritAttrs: false,
    props: {
        title: {
            type: String
        },
        icon: {
            type: String
        },
        closable: {
            type: Boolean
        },
        active: {
            type: Boolean
        }
    },
    emits: ['close', 'click'],
    setup(props, { attrs, emit }) {
        // 关闭标签事件
        const handleClose = (e: MouseEvent): void => {
            e.stopPropagation()
            emit('close')
        }
        // 点击标签事件
        const handleClick = () => {
            emit('click')
        }
        return () => {
            return (
                <div {...attrs} class={['nav-tag-btn', { active: props.active }]} onClick={handleClick}>
                    {props.icon && <LvIcon icon={props.icon} class='nav-tag-btn__icon'></LvIcon>}
                    <span class='nav-tag-btn__title'>{props.title}</span>
                    {props.closable && <LvIcon icon='carbon:close' class='nav-tag-btn__close' onClick={handleClose}></LvIcon>}
                </div>
            )
        }
    }
})
