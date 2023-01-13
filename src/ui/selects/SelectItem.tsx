import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import OkIcon from '../icons/Icon.Ok'
import { selectStyles } from './styles'
import { SelectItemProps } from './types'

const SelectItem = <Item,>({
  renderItem,
  item,
  style,
  onSelect,
  showSelectedIcon = true,
  isSelected,
}: SelectItemProps<Item>) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(item)}
      style={[
        selectStyles.item,
        style?.wrapper,
        isSelected && style?.item__selected,
      ]}
    >
      <View style={style?.row_wrapper}>
        {renderItem(item)}
        <View
          style={[
            selectStyles.icon_checkMark__wrapper,
            style?.icon_checkMark__wrapper,
          ]}
        >
          {showSelectedIcon && isSelected && (
            <OkIcon color={'#347B81'} size={24} style={style?.icon_checkMark} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SelectItem
