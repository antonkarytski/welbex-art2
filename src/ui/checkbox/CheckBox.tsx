import React, { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import Span from '../Span'
import OkIcon from '../icons/Icon.Ok'

type CheckboxProps = PropsWithChildren<{
  label?: string
  iconSize?: number
  iconColor?: string
  isSelected: boolean
  isInvalid?: boolean
  onSelect?: (state: boolean) => void
  style?: {
    container?: StyleProp<ViewStyle>
    checkbox?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
  }
}>

const Checkbox = ({
  label = '',
  children,
  iconSize = 12,
  iconColor = '#ffffff',
  onSelect,
  isSelected,
  isInvalid,
  style,
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style?.container]}
      onPress={() => onSelect?.(!isSelected)}
      activeOpacity={onSelect ? 0.7 : 1}
    >
      <View
        style={[
          styles.default,
          isSelected && styles.selected,
          isInvalid && styles.invalid,
          style?.checkbox,
        ]}
      >
        {isSelected && <OkIcon size={iconSize} color={iconColor} />}
      </View>
      {children ||
        (label && (
          <Span
            label={label}
            style={[styles.label, style?.label]}
            weight={500}
          />
        ))}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    marginLeft: 12,
  },
  default: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: defaultColors.checkboxBorder,
    backgroundColor: defaultColors.checkboxBackground,
  },
  selected: {
    borderColor: defaultColors.checkboxBackgroundActive,
    backgroundColor: defaultColors.checkboxBackgroundActive,
  },
  invalid: {
    borderColor: defaultColors.errorBorder,
  },
})

export default Checkbox
