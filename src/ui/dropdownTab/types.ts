import { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Fn } from '../../types'
import { PresetDropdownTabStates } from './styles.preset'

export type ElementMeasureProps = {
  w: number
  h: number
  px: number
  py: number
}

export type DropdownComponentStyles = Omit<DropdownStyles, 'tab'> & {
  tab?: StyleProp<ViewStyle>
}

export type DropdownTabProps = {
  label?: string | ReactNode
  tabLabel: string | ReactNode
  children: ReactNode
  indentFromTab?: number
  style?: DropdownComponentStyles
  overlayBackgroundColor?: string
  onOpenDropdown?: Fn
  preset?: PresetDropdownTabStates
}

export type DropdownStyles = {
  label?: TextStyle
  dropdownContainer?: ViewStyle
  tab?: ViewStyle
  tabLabel?: TextStyle
  tabIcon?: ViewStyle
  tabInnerWrapper?: ViewStyle
  wrapper?: ViewStyle
  toggleIcon__opened?: ViewStyle
}
