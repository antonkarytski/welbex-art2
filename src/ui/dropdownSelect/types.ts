import { ReactNode } from 'react';
import { SelectModel } from '../../lib/componentsModels/model.select';
import { DropdownStyles } from '../dropdownTab/types'


export type SelectProps<DataItem> = {
  label?: string | ReactNode
  data: DataItem[]
  renderItem: (item: DataItem) => ReactNode
  model: SelectModel
  placeholder?: string
  idExtractorName?: keyof DataItem
  nameExtractorName?: keyof DataItem
  dropdownStyles?: DropdownStyles
}
