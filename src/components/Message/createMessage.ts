import { createApp } from 'vue'

import Message from './index.vue'
import type { MessageType } from './types'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
    const messageInstance = createApp(Message, {
        message,
        type
    })
    const domNode = document.createElement('div')
    messageInstance.mount(domNode)
    document.body.appendChild(domNode)

    setTimeout(() => {
        messageInstance.unmount()
        document.body.removeChild(domNode)
    }, timeout)
}

export default createMessage
