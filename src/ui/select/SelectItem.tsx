import { Event } from 'effector'
import React, { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
import { SelectedItemId } from './model'
import { selectStyles } from './styles'

type SelectItemProps<DataItem> = {
  item: DataItem
  itemId: number | string
  selectedItemId: SelectedItemId
  renderItem: (item: DataItem) => ReactNode
  setSelectedItemId: Event<SelectedItemId>
}

function SelectItem<DataItem>({
  renderItem,
  item,
  itemId,
  selectedItemId,
  setSelectedItemId,
}: SelectItemProps<DataItem>) {
  const Item = renderItem(item)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setSelectedItemId(itemId)}
      style={[
        selectStyles.item,
        String(selectedItemId) === String(itemId) &&
          selectStyles.item__selected,
      ]}
      key={itemId}
    >
      {Item}
    </TouchableOpacity>
  )
}

export default SelectItem
