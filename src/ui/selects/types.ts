import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/componentsModels/model.search'
import { FnExt } from '../../types'
import { DropdownStyles } from '../dropdownTab/types'
import { InputStyles } from '../input/styles'

export type StringExtractor<T> = FnExt<T, string>
export type RenderItem<T> = FnExt<T, ReactNode>

export type SelectItemStyles = {
  wrapper?: StyleProp<ViewStyle>
  row_wrapper?: StyleProp<ViewStyle>
  icon_checkMark__wrapper?: StyleProp<ViewStyle>
  icon_checkMark?: StyleProp<ViewStyle>
  item__selected?: StyleProp<ViewStyle>
}

export type SelectItemProps<Item> = {
  item: Item
  onSelect: (item: Item) => void
  renderItem: RenderItem<Item>
  idExtractor?: StringExtractor<Item>
  showSelectedIcon?: boolean
  styles?: SelectItemStyles
  isSelected?: boolean
}

export type SelectStyles = {
  item?: SelectItemStyles
  listWrapper?: StyleProp<ViewStyle>
}

export type SelectProps<Item> = {
  label?: string | ReactNode
  data: Item[]
  renderItem: RenderItem<Item>
  idExtractor: StringExtractor<Item>
  ItemSeparatorComponent?: React.ComponentType<any> | null
  model: StateModel<Item>
  styles?: SelectStyles
  showSelectedIcon?: boolean
}

export type DropdownSelectProps<Item> = SelectProps<Item> & {
  placeholder?: string
  label?: string | ReactNode
  styles?: SelectStyles & { dropdownTab?: DropdownStyles }
  labelExtractor: StringExtractor<Item>
}

export type ListSelectProps<Item> = SelectProps<Item> & {
  searchModel: SearchableListModel<Item>
  searchable?: boolean
  styles?: SelectStyles & {
    inputStyles?: InputStyles
    wrapper?: StyleProp<ViewStyle>
  }
}
