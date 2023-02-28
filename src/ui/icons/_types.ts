import { StyleProp, ViewStyle } from 'react-native'

export type IconProps = {
  size?: number
  color?: string
  style?: StyleProp<ViewStyle>
}

export type FilledIconProps = IconProps & {
  fill?: string
}
