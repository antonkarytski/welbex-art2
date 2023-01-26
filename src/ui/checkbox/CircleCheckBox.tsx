import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

type CircleCheckBoxProps = {
  isSelected: boolean
  onSelect?: (state: boolean) => void
  style?: StyleProp<ViewStyle>
  color?: ((state: boolean) => string) | string
}

function getColor(
  color: ((state: boolean) => string) | string | undefined,
  state = false
): ViewStyle {
  if (!color) return {}
  if (typeof color === 'function') {
    return { borderColor: color(state) }
  }
  return { borderColor: color }
}

const CircleCheckBox = ({
  isSelected,
  onSelect,
  style,
  color,
}: CircleCheckBoxProps) => {
  return (
    <TouchableOpacity style={style} onPress={() => onSelect?.(!isSelected)}>
      <View
        style={[
          styles.common,
          isSelected && styles.selected,
          getColor(color, isSelected),
        ]}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  common: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  selected: {
    borderWidth: 6,
  },
})

export default CircleCheckBox
