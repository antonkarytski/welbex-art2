import { TextStyle, ViewStyle } from 'react-native'

export type ElementMeasureProps = {
  w: number
  h: number
  px: number
  py: number
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
