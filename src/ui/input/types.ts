import { ReactNode } from 'react'
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

export type InputStyles = {
  container?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  input?: StyleProp<ViewStyle>
  input__focused?: StyleProp<ViewStyle>
  wrapper?: StyleProp<ViewStyle>
  inputWrapper?: StyleProp<ViewStyle>
  pseudoBefore?: StyleProp<ViewStyle>
  pseudoAfter?: StyleProp<ViewStyle>
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
} & Omit<TextInputProps, 'onChange'>
