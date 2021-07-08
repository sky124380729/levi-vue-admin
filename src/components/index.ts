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

import { Button, Select, Input, Form, Tabs } from 'ant-design-vue'

export function registerGC(app: App) {
    // antd compontents
    app.use(Select)
    app.use(Button)
    app.use(Input)
    app.use(Form)
    app.use(Tabs)
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

export { LvCharts, LvForm, LvPage, LvModalForm, LvIcon, LvSearch, LvTable, Button, Input, Select, Form, Tabs }

export type { FormSchema, TableFormat }
