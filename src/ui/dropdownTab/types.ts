import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type ElementMeasureProps = {
  w: number
  h: number
  px: number
  py: number
}

export type DropdownStyles = {
  label?: StyleProp<TextStyle>
  dropdownContainer?: ViewStyle
  tab?: StyleProp<ViewStyle>
  tabLabel?: StyleProp<TextStyle>
  tabIcon?: StyleProp<ViewStyle>
  tabInnerWrapper?: StyleProp<ViewStyle>
}
