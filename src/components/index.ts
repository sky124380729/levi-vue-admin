import { getApp } from '/@/useApp'
import {
    // customer

    // ant-design-vue
    Button,
    Select,
    Alert,
    Checkbox,
    DatePicker,
    Radio,
    Switch,
    Card,
    List,
    Tabs,
    Descriptions,
    Tree,
    Table,
    Divider,
    Modal,
    Drawer,
    Dropdown,
    Tag,
    Tooltip,
    Badge,
    Popover,
    Upload,
    Transfer,
    Steps
} from 'ant-design-vue'

export function registerGC() {
    getApp()
        .use(Button)
        .use(Select)
        .use(Alert)
        .use(Checkbox)
        .use(DatePicker)
        .use(Radio)
        .use(Switch)
        .use(Card)
        .use(List)
        .use(Descriptions)
        .use(Tree)
        .use(Table)
        .use(Divider)
        .use(Modal)
        .use(Drawer)
        .use(Dropdown)
        .use(Tag)
        .use(Tooltip)
        .use(Badge)
        .use(Popover)
        .use(Upload)
        .use(Transfer)
        .use(Steps)
        .use(Tabs)
}
