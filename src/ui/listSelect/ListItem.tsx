import { Event } from 'effector'
import React, { ReactNode } from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { SelectedItemId } from '../../lib/componentsModels/model.select'
import { FnExt } from '../../types'
import OkIcon from '../icons/Icon.Ok'
import { listStyles } from './styles'

export type OnListItemPress = FnExt<GestureResponderEvent, void>

type ListItemProps<DataItem> = {
  item: DataItem
  itemId: number | string
  onPress?: OnListItemPress
  style?: StyleProp<ViewStyle>
  renderItem: (item: DataItem) => ReactNode
  selectedItemId: SelectedItemId
  setSelectedItemId: Event<SelectedItemId>
}

function SelectItem<DataItem>({
  renderItem,
  item,
  itemId,
  style,
  selectedItemId,
  setSelectedItemId,
}: ListItemProps<DataItem>) {
  const Item = renderItem(item)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setSelectedItemId(itemId)}
      style={[listStyles.item, style]}
      key={itemId}
    >
      <View>
        {Item}
        <View style={listStyles.icon_checkMark__wrapper}>
          {String(selectedItemId) === String(itemId) && (
            <OkIcon color={'#347B81'} size={24} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SelectItem
