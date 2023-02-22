import { ImageProps, StyleProp, ViewStyle } from 'react-native'

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
export type MotionGradientColors = GradientColors & { overlay?: string }

export type ImageGradientProps = Omit<GradientsProps, 'stopOffset'> & {
  startOffset?: string
  endOffset?: string
  imageHeight: number
  source: ImageProps['source']
}
