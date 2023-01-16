import { PropsWithChildren } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { FormModel } from '../../lib/componentsModels/model.form'
import { FnExt } from '../../types'
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
  name: string
  model: FormModel<T>
  isValid?: boolean | null
  iconColor?: string
  style?: InputStyles
  iconSize?: number
}

export type ToggleSecureIconProps = {
  secure: boolean
  setSecure: FnExt<boolean>
  color?: string
  size?: number
}
