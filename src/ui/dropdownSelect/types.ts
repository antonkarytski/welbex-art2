import { ReactNode } from 'react'
import { StateModel } from 'altek-toolkit'
import { DropdownStyles } from '../dropdownTab/types'

export type SelectProps<DataItem> = {
  label?: string | ReactNode
  data: DataItem[]
  renderItem: (item: DataItem) => ReactNode
  model: StateModel<DataItem>
  placeholder?: string
  idExtractor: (item: DataItem) => string
  labelExtractor?: (item: DataItem) => string
  dropdownStyles?: DropdownStyles
}
