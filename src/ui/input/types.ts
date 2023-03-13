import { ReactNode } from 'react'
import {
  KeyboardTypeOptions,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

export type InputStyles = {
  container?: ViewStyle
  label?: TextStyle
  input?: ViewStyle
  input__focused?: ViewStyle
  wrapper?: ViewStyle
  inputWrapper?: ViewStyle
  pseudoBefore?: ViewStyle
  pseudoAfter?: ViewStyle
  invalid?: ViewStyle
  valid?: ViewStyle
}

export type InputProps = {
  onChangeText?: (text: string) => void
  type?: KeyboardTypeOptions
  label?: string
  isValid?: boolean | null
  disabled?: boolean
  styles?: InputStyles
  InputPseudoBefore?: ReactNode
  InputPseudoAfter?: ReactNode
  postfix?: string
} & Omit<TextInputProps, 'onChange'>
