import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SearchableListModel } from '../../lib/componentsModels/model.search'
import { SelectModel } from '../../lib/componentsModels/model.select'
import { InputStyles } from '../input/styles'
import { OnListItemPress } from './ListItem'

export type ListSelectStyles = {
  item?: StyleProp<ViewStyle>
  list?: StyleProp<ViewStyle>
  item__selected?: StyleProp<ViewStyle>
}

export type SearchableListProps<DataItem> = {
  data: DataItem[]
  renderItem: (item: DataItem) => ReactNode
  idExtractorName: keyof DataItem
  ItemSeparatorComponent?: React.ComponentType<any>
  onItemPress?: OnListItemPress
  styles?: ListSelectStyles
  styleInput?: InputStyles
  searchable?: boolean
  searchModel: SearchableListModel<DataItem>
  selectModel: SelectModel
}
