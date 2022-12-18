import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Drawing } from './types'

type DrawingProps = {
  size: number
  item: Drawing
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (item: Drawing) => void
}

const DrawingItem = React.memo(
  ({ size, style, containerStyle, onPress, item }: DrawingProps) => {
    return (
      <TouchableOpacity onPress={() => onPress?.(item)} style={containerStyle}>
        <Image
          source={item.image}
          style={[style, { width: size, height: size }]}
        />
      </TouchableOpacity>
    )
  }
)

export default DrawingItem
