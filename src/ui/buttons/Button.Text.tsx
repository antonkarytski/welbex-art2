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
  styles?: Styles
}

export default function TextButton({
  onPress,
  disabled,
  label,
  styles,
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
      style={[
        buttonStyles.button,
        styles?.button,
        disabled && styles?.buttonDisabled,
      ]}
    >
      <Span
        weight={500}
        style={[
          buttonStyles.label,
          styles?.label,
          disabled && styles?.labelDisabled,
        ]}
        label={label}
      />
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
  label: {
    color: COLOR_THEMES.LIGHT.textAccent,
    fontSize: 14,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
})
