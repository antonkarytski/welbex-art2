import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TypedFormFieldComponentProps } from '../../lib/models/model.form'
import { FnExt } from '../../types'
import { SpanProps } from '../Span'
import { InputProps, InputStyles } from '../input/types'

export type NoteProps = PropsWithChildren<{
  label: string
  iconColor?: string
  iconSize?: number
  labelFontWeight?: SpanProps['weight']
  style?: {
    row?: StyleProp<ViewStyle>
    icon?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
  }
}>

export type SecureFieldProps<
  T extends Record<string, any>,
  K extends keyof T
> = {
  placeholder: string
  isValid?: boolean | null
  iconColor?: string
  style?: InputStyles
  iconSize?: number
} & TypedFormFieldComponentProps<T, K, string>

export type FormatFieldValue = FnExt<string, string>

export type FieldProps<T extends Record<string, any>, N extends keyof T, V> = {
  label?: string
  style?: InputStyles
  formatValue?: FormatFieldValue
} & TypedFormFieldComponentProps<T, N, V> &
  Omit<InputProps, 'style'>
