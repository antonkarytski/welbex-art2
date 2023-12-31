import React, { ReactNode } from 'react'
import { FlatListProps, StyleProp, ViewStyle } from 'react-native'
import { StateModel } from 'altek-toolkit'
import { SearchableListModel } from '../../lib/models/model.search'
import { Fn, FnExt } from '../../types'
import { SearchableListStyles } from '../SearchableList'
import { PresetDropdownTabStates } from '../dropdownTab/styles.preset'
import { DropdownComponentStyles } from '../dropdownTab/types'
import { InputStyles } from '../input/types'
import { PresetSelectItemStates } from './selectItem/styles.preset'
import { RenderItem, SelectItemStyles } from './selectItem/types'

export type StringExtractor<T> = FnExt<T, string>

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
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any>
    | null
  style?: SelectStyles
  showSelectedIcon?: boolean
  preset?: PresetSelectItemStates
  onEndReached?: FlatListProps<T>['onEndReached']
  stickyHeaderIndices?: FlatListProps<T>['stickyHeaderIndices']
}

type SearchableSelectSettings<T> = SelectProps<T> & {
  style?: SearchableListStyles & SelectStyles
}

export type DropdownSelectStyles = {
  select?: SelectStyles
  dropdownTab?: DropdownComponentStyles
}

export type DropdownSelectPreset = {
  selectItem?: PresetSelectItemStates
  dropdownTab?: PresetDropdownTabStates
}

export type SearchableSelectProps<T> = SearchableSelectSettings<T> & {
  searchModel: SearchableListModel<T>
  model: StateModel<T | null>
}

export type ListSelectProps<T> = SearchableSelectSettings<T> & {
  searchModel?: SearchableListModel<T>
  model: StateModel<T | null>
}

export type DropdownSelectProps<T> = ListSelectProps<T> & {
  placeholder?: string
  label?: string | ReactNode
  style?: DropdownSelectStyles & {
    searchInput?: InputStyles
  }
  onOpenDropdown?: Fn
  preset?: DropdownSelectPreset
}
