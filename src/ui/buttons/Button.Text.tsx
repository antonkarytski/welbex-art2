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

export type ButtonTextProps = {
  onPress: Fn
  label?: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  styleDisabled?: StyleProp<ViewStyle>
  styleLabel?: StyleProp<TextStyle>
}

export default function ButtonBig({
  onPress,
  disabled,
  style,
  label,
  styleLabel,
  styleDisabled,
}: ButtonTextProps) {

  return (
    <TouchableOpacity
      disabled={disabled}
			onPress={onPress}
			activeOpacity={0.6}
      style={[
        style,
        disabled && styleDisabled,
      ]}
    >
			<Span
				weight={500}
				style={[styles.label, styleLabel]}
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
})
