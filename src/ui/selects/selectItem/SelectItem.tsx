import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Span from '../../Span'
import OkIcon from '../../icons/Icon.Ok'
import { selectStyles as styles } from '../styles'
import { useSelectItemPreset } from './styles.preset'
import { SelectItemProps } from './types'

const SelectItem = <Item,>({
  renderItem,
  item,
  style,
  onSelect,
  showSelectedIcon = true,
  isSelected,
  labelExtractor,
  preset,
}: SelectItemProps<Item>) => {
  const activeStyles = useSelectItemPreset({ preset, isSelected })

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(item)}
      style={[
        styles.item,
        style?.wrapper,
        isSelected && style?.item__selected,
        activeStyles.item,
      ]}
    >
      <View
        style={[style?.row_wrapper, showSelectedIcon && { paddingRight: 40 }]}
      >
        {renderItem
          ? renderItem(item, isSelected)
          : labelExtractor && (
              <Span
                label={labelExtractor(item)}
                style={[
                  styles.item_label,
                  isSelected && styles.item_label__selected,
                  activeStyles.itemLabel,
                ]}
              />
            )}
        <View
          style={[
            styles.icon_checkMark__wrapper,
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
