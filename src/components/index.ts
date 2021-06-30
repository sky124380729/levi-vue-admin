import type { App } from 'vue'
import Charts from './Charts'
import Form, { FormSchema } from './Form'
import Page from './Page'
import ModalForm from './ModalForm'
import Icon from './Icon'
import Search from './Search'
import Table, { TableFormat } from './Table'
import Input from './Input'
import Select from './Select'

export function registerGC(app: App) {
    app.component(Charts.name, Charts)
    app.component(Form.name, Form)
    app.component(Page.name, Page)
    app.component(ModalForm.name, ModalForm)
    app.component(Icon.name, Icon)
    app.component(Search.name, Search)
    app.component(Table.name, Table)
    app.component(Input.name, Input)
    app.component(Select.name, Select)
}

export { Charts, Form, Page, ModalForm, Icon, Search, Table, Input, Select }

export type { FormSchema, TableFormat }
