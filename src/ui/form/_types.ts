import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TypedFormFieldComponentProps } from '../../lib/componentsModels/model.form'
import { SpanProps } from '../Span'
import { InputStyles } from '../input/types'

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
