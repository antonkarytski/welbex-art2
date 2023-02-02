import { StyleProp, ViewStyle } from 'react-native'

export type GradientColors = {
  start?: string
  end?: string
}

export type GradientsProps = {
  style?: StyleProp<ViewStyle>
  gradientTransform?: string
  stopOffset?: string
  colors?: GradientColors
}
