import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/models/model.search'
import { Fn, FnExt } from '../../types'
import { DropdownComponentStyles } from '../dropdownTab/types'
import { InputStyles } from '../input/types'
import { SearchableListStyles } from '../searchableList/SearchableList'

export type StringExtractor<T> = FnExt<T, string>
export type RenderItem<T> = (item: T, isSelected?: boolean) => ReactNode

export type SelectItemStyles = {
  wrapper?: StyleProp<ViewStyle>
  row_wrapper?: StyleProp<ViewStyle>
  icon_checkMark__wrapper?: StyleProp<ViewStyle>
  icon_checkMark?: StyleProp<ViewStyle>
  item__selected?: StyleProp<ViewStyle>
}

export type SelectItemProps<T> = {
  item: T
  onSelect: (item: T) => void
  renderItem?: RenderItem<T>
  idExtractor?: StringExtractor<T>
  labelExtractor?: StringExtractor<T>
  showSelectedIcon?: boolean
  style?: SelectItemStyles
  isSelected?: boolean
}

export type SelectStyles = {
  item?: SelectItemStyles
  container?: StyleProp<ViewStyle>
}

export type SelectProps<T> = {
  label?: string | ReactNode
  data: T[]
  renderItem?: RenderItem<T>
  idExtractor: StringExtractor<T>
  labelExtractor?: StringExtractor<T>
  ItemSeparatorComponent?: React.ComponentType<any> | null
  ListFooterComponent?: React.ComponentType<any> | null
  model: StateModel<T>
  style?: SelectStyles
  showSelectedIcon?: boolean
}

export type SearchableSelectProps<T> = SelectProps<T> & {
  searchModel: SearchableListModel<T>
  style?: SearchableListStyles & SelectStyles
}

export type DropdownSelectStyles = {
  select?: SelectStyles
  dropdownTab?: DropdownComponentStyles
}

export type DropdownSelectProps<T> = Omit<
  SearchableSelectProps<T>,
  'searchModel'
> & {
  searchModel?: SearchableListModel<T>
  placeholder?: string
  label?: string | ReactNode
  style?: DropdownSelectStyles & {
    searchInput?: InputStyles
  }
  onOpenDropdown?: Fn
}

export type ListSelectProps<T> = Omit<
  SearchableSelectProps<T>,
  'searchModel'
> & {
  searchModel?: SearchableListModel<T>
}
