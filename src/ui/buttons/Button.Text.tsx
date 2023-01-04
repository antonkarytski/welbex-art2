import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { COLOR_THEMES } from '../../features/themed/theme'
import { Fn } from '../../types'
import Span from '../Span'

type Styles = {
  button?: StyleProp<ViewStyle>
  buttonDisabled?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  labelDisabled?: StyleProp<TextStyle>
}

export type ButtonProps = {
  onPress: Fn
  label?: string
  disabled?: boolean
  style?: Styles
}

export default function TextButton({
  onPress,
  disabled,
  label,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
      style={[styles.button, style?.button, disabled && style?.buttonDisabled]}
    >
      <Span
        weight={500}
        style={[styles.label, style?.label, disabled && style?.labelDisabled]}
        label={label}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  label: {
    color: COLOR_THEMES.LIGHT.textAccent,
    fontSize: 14,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
})
