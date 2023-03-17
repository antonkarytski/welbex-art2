import { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Fn, NodeFn } from '../../types'

export type Preset = {
  background: string
  label: string
  border?: string
}

export type PresetButtonStates = {
  common: Preset
  active: Preset
  disabled?: Preset
}

export type ButtonProps = {
  onPress?: Fn
  label?: string
  disabled?: boolean
  preset?: PresetButtonStates
  disabledStyle?: StyleProp<ViewStyle>
}

export type PresetButtonProps = ButtonProps & {
  labelStyle?: StyleProp<TextStyle>
  children?: NodeFn<Preset> | ReactNode | string
  style?: StyleProp<ViewStyle>
}

export type BigIconButtonProps = ButtonProps & {
  iconColor?: string
  style?: BigIconButtonStyles
}

export type BigIconButtonStyles = {
  icon?: StyleProp<ViewStyle>
  row?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  button?: StyleProp<ViewStyle>
}
