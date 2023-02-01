import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { NodeFn } from 'altek-toolkit'
import Span from '../Span'
import { IconProps } from '../icons/_types'

type IconButtonProps = {
  Icon?: NodeFn<IconProps>
  onPress: () => void
  iconSize?: number
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  iconColor?: string
  label?: string
}

const IconButton = ({
  onPress,
  Icon,
  iconSize,
  iconColor,
  style,
  label,
  labelStyle,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, !label && styles.sizedContainer, style]}
      activeOpacity={0.8}
    >
      {Icon?.({ color: iconColor, size: iconSize })}
      {label && (
        <Span label={label} weight={500} style={[styles.label, labelStyle]} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  sizedContainer: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    marginTop: 6,
  },
})

export default IconButton
