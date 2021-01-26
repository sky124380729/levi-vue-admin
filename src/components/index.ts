import { getApp } from '/@/useApp'

import Charts from '/@/components/Charts'
import FormModal from '/@/components/FormModal'
import Icon from '/@/components/Icon'
import Search from '/@/components/Search'
import Table from '/@/components/Table'

export function registerGC() {
    const app = getApp()
    app.component(Charts.name, Charts)
    app.component(FormModal.name, FormModal)
    app.component(Icon.name, Icon)
    app.component(Search.name, Search)
    app.component(Table.name, Table)
}
