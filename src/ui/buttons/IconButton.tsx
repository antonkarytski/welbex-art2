import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { NodeFn } from 'altek-toolkit'
import { IconProps } from '../icons/_types'

type IconButtonProps = {
  Icon: NodeFn<IconProps>
  onPress: () => void
  iconSize?: number
  style?: StyleProp<ViewStyle>
  iconColor?: string
}

const IconButton = ({
  onPress,
  Icon,
  iconSize,
  iconColor,
  style,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      {Icon?.({ color: iconColor, size: iconSize })}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
})

export default IconButton
