import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type TabRoute = {
  key: string
  title?: string
  Icon?: () => React.ReactElement
}

export type TabMenuButtonStyles = {
  label?: StyleProp<TextStyle>
  labelActive?: StyleProp<TextStyle>
  button?: StyleProp<ViewStyle>
  buttonActive?: StyleProp<ViewStyle>
}

export type TabMenuStyles = TabMenuButtonStyles & {
  container?: StyleProp<ViewStyle>
  line?: StyleProp<ViewStyle>
  activeLine?: StyleProp<ViewStyle>
}
