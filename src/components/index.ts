import type { App } from 'vue'
import LvCharts from './Charts'
import LvForm, { FormSchema } from './Form'
import LvPage from './Page'
import LvModalForm from './ModalForm'
import LvIcon from './Icon'
import LvSearch from './Search'
import LvTable, { TableFormat } from './Table'
import LvInput from './Input'
import LvSelect from './Select'

import Antd from 'ant-design-vue'

export function registerGC(app: App) {
    // antd compontents
    app.use(Antd)
    // customer components
    app.component(LvCharts.name, LvCharts)
    app.component(LvForm.name, LvForm)
    app.component(LvPage.name, LvPage)
    app.component(LvModalForm.name, LvModalForm)
    app.component(LvIcon.name, LvIcon)
    app.component(LvSearch.name, LvSearch)
    app.component(LvTable.name, LvTable)
    app.component(LvInput.name, LvInput)
    app.component(LvSelect.name, LvSelect)
}

export { LvCharts, LvForm, LvPage, LvModalForm, LvIcon, LvSearch, LvTable }

export type { FormSchema, TableFormat }
