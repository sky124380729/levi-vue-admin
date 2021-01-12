import { defineComponent } from 'vue'
import Icon from '/@/components/Icon'
import './tag.less'

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
                <div {...attrs} class={['nav-tag', { active: props.active }]} onClick={handleClick}>
                    {props.icon && <Icon icon={props.icon} class='tag__icon'></Icon>}
                    <span class='tag__title'>{props.title}</span>
                    {props.closable && <Icon icon='carbon:close' class='tag__close' onClick={handleClose}></Icon>}
                </div>
            )
        }
    }
})
