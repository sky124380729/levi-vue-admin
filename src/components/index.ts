import { getApp } from '/@/useApp'

import Charts from '/@/components/Charts'
import Form from '/@/components/Form'
import FormModal from '/@/components/FormModal'
import ModalForm from '/@/components/ModalForm'
import Icon from '/@/components/Icon'
import Search from '/@/components/Search'
import Table from '/@/components/Table'
import Select from '/@/components/Select'
import Upload from '/@/components/Upload'

export function registerGC() {
    const app = getApp()
    app.component(Charts.name, Charts)
    app.component(Form.name, Form)
    app.component(FormModal.name, FormModal)
    app.component(ModalForm.name, ModalForm)
    app.component(Icon.name, Icon)
    app.component(Search.name, Search)
    app.component(Table.name, Table)
    app.component(Select.name, Select)
    app.component(Upload.name, Upload)
}
