import { Event } from 'effector'
import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SearchableListModel } from '../../lib/componentsModels/model.search'
import {
  SelectModel,
  SelectedItemId,
} from '../../lib/componentsModels/model.select'
import { FnExt } from '../../types'
import { DropdownStyles } from '../dropdownTab/types'
import { InputStyles } from '../input/styles'

export type ItemId = SelectedItemId
export type KeyExtractor<T> = FnExt<T, string>
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
  onSelect: Event<SelectedItemId>
  renderItem: RenderItem<Item>
  checkIsSelected: (itemId: ItemId) => boolean
  idExtractor?: KeyExtractor<Item>
  showSelectedIcon?: boolean
  styles?: SelectItemStyles
}

export type SelectStyles = {
  item?: SelectItemStyles
  listWrapper?: StyleProp<ViewStyle>
}

export type SelectProps<Item> = {
  data: Item[]
  renderItem: RenderItem<Item>
  idExtractor?: KeyExtractor<Item>
  ItemSeparatorComponent?: React.ComponentType<any> | null
  model: SelectModel
  styles?: SelectStyles
  showSelectedIcon?: boolean
}

export type DropdownSelectProps<Item> = SelectProps<Item> & {
  placeholder?: string
  label?: string | ReactNode
  styles?: SelectStyles & { dropdownTab?: DropdownStyles }
  labelExtractor: KeyExtractor<Item>
  selectedItemId: SelectedItemId
}

export type ListSelectProps<Item> = SelectProps<Item> & {
  searchModel: SearchableListModel<Item>
  searchable?: boolean
  styles?: SelectStyles & {
    inputStyles?: InputStyles
    wrapper?: StyleProp<ViewStyle>
  }
}
