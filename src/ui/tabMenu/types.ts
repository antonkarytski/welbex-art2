import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type TabMenuButtonStyle = {
  label?: StyleProp<TextStyle>
  labelActive?: StyleProp<TextStyle>
  button?: StyleProp<ViewStyle>
  buttonActive?: StyleProp<ViewStyle>
}
