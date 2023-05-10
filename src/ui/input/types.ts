import { ReactNode } from 'react'
import {
  KeyboardTypeOptions,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { MergedUnit } from '../../types'

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
  disabled?: ViewStyle
}

export type MergedInputStyles = MergedUnit<InputStyles>

export type InputProps = {
  onChangeText?: (text: string) => void
  type?: KeyboardTypeOptions
  label?: string
  isValid?: boolean | null
  disabled?: boolean
  styles?: InputStyles | MergedInputStyles
  InputPseudoBefore?: ReactNode
  InputPseudoAfter?: ReactNode
  postfix?: string
} & Omit<TextInputProps, 'onChange'>
