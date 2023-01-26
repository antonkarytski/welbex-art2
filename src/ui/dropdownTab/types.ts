import { ReactNode } from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { SpanProps } from '../Span'

export type ElementMeasureProps = {
  w: number
  h: number
  px: number
  py: number
}

export type DropdownTabProps = {
  label?: string | ReactNode
  tabLabel: string | ReactNode
  children: ReactNode
  indentFromTab?: number
  style?: DropdownStyles
  labelWeight?: SpanProps['weight']
  overlayBackgroundColor?: string
}

export type DropdownStyles = {
  label?: TextStyle
  activeLabel?: TextStyle
  dropdownContainer?: ViewStyle
  tab?: ViewStyle
  activeTab?: ViewStyle
  tabLabel?: TextStyle
  activeTabLabel?: TextStyle
  tabIcon?: ViewStyle
  tabInnerWrapper?: ViewStyle
  wrapper?: ViewStyle
  toggleIcon__opened?: ViewStyle
}
