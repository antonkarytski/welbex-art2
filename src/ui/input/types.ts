import { ReactNode } from 'react'
import { KeyboardTypeOptions, TextInputProps } from 'react-native'
import { InputStyles } from './styles'

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
