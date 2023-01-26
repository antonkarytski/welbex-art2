import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/componentsModels/model.search'
import { FnExt } from '../../types'
import { SpanProps } from '../Span'
import { DropdownStyles } from '../dropdownTab/types'
import { InputStyles } from '../input/types'

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
  style?: SelectItemStyles
  isSelected?: boolean
}

export type SelectStyles = {
  item?: SelectItemStyles
  listWrapper?: StyleProp<ViewStyle>
}

export type SelectProps<Item> = {
  label?: string | ReactNode
  labelWeight?: SpanProps['weight']
  data: Item[]
  renderItem: RenderItem<Item>
  idExtractor: StringExtractor<Item>
  ItemSeparatorComponent?: React.ComponentType<any> | null
  ListFooterComponent?: React.ComponentType<any> | null
  model: StateModel<Item>
  style?: SelectStyles
  showSelectedIcon?: boolean
}

export type DropdownSelectStyles = {
  select?: SelectStyles
  dropdownTab?: DropdownStyles
}

export type DropdownSelectProps<Item> = SelectProps<Item> & {
  placeholder?: string
  label?: string | ReactNode
  style?: DropdownSelectStyles
  labelExtractor: StringExtractor<Item>
}

export type ListSelectProps<Item> = SelectProps<Item> & {
  searchModel: SearchableListModel<Item>
  searchable?: boolean
  style?: SelectStyles & {
    inputStyles?: InputStyles
    wrapper?: StyleProp<ViewStyle>
  }
}
