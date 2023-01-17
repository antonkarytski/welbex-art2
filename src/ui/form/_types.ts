import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { FormModel } from '../../lib/componentsModels/model.form'
import { SpanProps } from '../Span'
import { InputStyles } from '../input/types'

export type NoteProps = {
  label: string
  iconColor?: string
  iconSize?: number
  labelFontWeight?: SpanProps['weight']
  style?: {
    row?: StyleProp<ViewStyle>
    icon?: StyleProp<ViewStyle>
    label?: StyleProp<TextStyle>
  }
} & PropsWithChildren

export type SecureFieldProps<T extends Record<string, string>> = {
  placeholder: string
  name: keyof T
  model: FormModel<T>
  isValid?: boolean | null
  iconColor?: string
  style?: InputStyles
  iconSize?: number
}
