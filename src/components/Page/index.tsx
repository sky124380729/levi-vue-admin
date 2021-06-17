import { defineComponent, PropType } from 'vue'
import './index.less'

export default defineComponent({
    name: 'levi-page',
    props: {
        title: {
            type: String as PropType<string>
        },
        subTitle: {
            type: String as PropType<string>
        }
    },
    setup(props, { slots }) {
        const { header, content, footer } = slots
        const renderHeader = () => {
            if (typeof header !== 'function') return null
            return (
                <>
                    <div class='levi-page__header__left'>
                        <p class='title'>{props.title}</p>
                        <p class='subTitle'>{props.subTitle}</p>
                    </div>
                    <div class='levi-page__header__right'>{header()}</div>
                </>
            )
        }
        const renderContent = () => {
            if (typeof content === 'function') {
                return content()
            }
        }
        const renderFooter = () => {
            if (typeof footer === 'function') {
                return footer()
            }
        }
        return () => {
            return (
                <div class='levi-page'>
                    <div class='levi-page__header'>{renderHeader()}</div>
                    <div class='levi-page__content'>{renderContent()}</div>
                    <div class='levi-page__footer'>{renderFooter()}</div>
                </div>
            )
        }
    }
})
