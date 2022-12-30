import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import OkIcon from '../icons/Icon.Ok'
import { selectStyles } from './styles'
import { SelectItemProps } from './types'

const SelectItem = <Item,>(props: SelectItemProps<Item>) => {
  const {
    renderItem,
    item,
    styles,
    onSelect,
    showSelectedIcon = true,
    idExtractor,
    checkIsSelected,
  } = props
  // @ts-ignore
  const itemId = idExtractor ? idExtractor(item) : item.id
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(itemId)}
      style={[
        selectStyles.item,
        styles?.wrapper,
        checkIsSelected(itemId) && styles?.item__selected,
      ]}
    >
      <View style={styles?.row_wrapper}>
        {renderItem(item)}
        <View
          style={[
            selectStyles.icon_checkMark__wrapper,
            styles?.icon_checkMark__wrapper,
          ]}
        >
          {showSelectedIcon && checkIsSelected(itemId) && (
            <OkIcon
              color={'#347B81'}
              size={24}
              style={styles?.icon_checkMark}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SelectItem
