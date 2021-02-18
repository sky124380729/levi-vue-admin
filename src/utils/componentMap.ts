import type { Component } from 'vue'
import { Input, Select, Radio, Checkbox, AutoComplete, Cascader, DatePicker, InputNumber, Switch, TimePicker, TreeSelect, Upload } from 'ant-design-vue'
import LvSelect from '/@/components/Select'
import LvInput from '/@/components/Input'

type AntdComponentType =
    | 'Input'
    | 'InputGroup'
    | 'InputPassword'
    | 'InputSearch'
    | 'InputTextArea'
    | 'InputNumber'
    | 'InputCountDown'
    | 'Select'
    | 'ApiSelect'
    | 'SelectOptGroup'
    | 'SelectOption'
    | 'TreeSelect'
    | 'Transfer'
    | 'RadioButtonGroup'
    | 'RadioGroup'
    | 'Checkbox'
    | 'CheckboxGroup'
    | 'AutoComplete'
    | 'Cascader'
    | 'DatePicker'
    | 'MonthPicker'
    | 'RangePicker'
    | 'WeekPicker'
    | 'TimePicker'
    | 'ImageUpload'
    | 'Switch'
    | 'StrengthMeter'
    | 'Upload'
    | 'Render'

type LeviComponentType = 'LvInput' | 'LvSelect'

type ComponentType = AntdComponentType | LeviComponentType

const componentMap = new Map<string, Component>()

// antd component
componentMap.set('Input', Input)
componentMap.set('InputGroup', Input.Group)
componentMap.set('InputPassword', Input.Password)
componentMap.set('InputSearch', Input.Search)
componentMap.set('InputTextArea', Input.TextArea)
componentMap.set('InputNumber', InputNumber)
componentMap.set('AutoComplete', AutoComplete)
componentMap.set('Select', Select)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('Switch', Switch)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('Checkbox', Checkbox)
componentMap.set('CheckboxGroup', Checkbox.Group)
componentMap.set('Cascader', Cascader)
componentMap.set('DatePicker', DatePicker)
componentMap.set('MonthPicker', DatePicker.MonthPicker)
componentMap.set('RangePicker', DatePicker.RangePicker)
componentMap.set('WeekPicker', DatePicker.WeekPicker)
componentMap.set('TimePicker', TimePicker)
componentMap.set('Upload', Upload)

// levi component
componentMap.set('LvInput', LvInput)
componentMap.set('LvSelect', LvSelect)

export function add(compName: string, component: Component) {
    componentMap.set(compName, component)
}

export function del(compName: string) {
    componentMap.delete(compName)
}

export { componentMap, ComponentType }
