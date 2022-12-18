import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type DrawingProps = {
  size: number
  image: ImageSourcePropType
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const DrawingItem = ({ size, image, style, containerStyle }: DrawingProps) => {
  return (
    <TouchableOpacity style={containerStyle}>
      <Image source={image} style={[style, { width: size, height: size }]} />
    </TouchableOpacity>
  )
}

export default DrawingItem
