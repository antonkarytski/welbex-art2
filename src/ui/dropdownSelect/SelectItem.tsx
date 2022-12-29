import { Event } from 'effector'
import React, { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native'
import { SelectedItemId } from '../../lib/componentsModels/model.select'
import { selectStyles } from './styles'

type SelectItemProps<DataItem> = {
  item: DataItem
  renderItem: (item: DataItem) => ReactNode
  isActive?: boolean
  onSelect: (item: DataItem) => void
}

function SelectItem<DataItem>({
  renderItem,
  item,
  isActive,
  onSelect,
}: SelectItemProps<DataItem>) {
  const Item = renderItem(item)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(item)}
      style={[selectStyles.item, !!isActive && selectStyles.item__selected]}
    >
      {Item}
    </TouchableOpacity>
  )
}

export default SelectItem
