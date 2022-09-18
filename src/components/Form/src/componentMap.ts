import { ElCheckbox, ElDatePicker, ElDivider, ElInput, ElSelect, ElSwitch } from 'element-plus'
import { Component } from 'vue'
import { ComponentType } from './types'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', ElInput)
componentMap.set('Select', ElSelect)
componentMap.set('Checkbox', ElCheckbox)
componentMap.set('Switch', ElSwitch)
componentMap.set('DatePicker', ElDatePicker)
componentMap.set('Divider', ElDivider)

export { componentMap }
