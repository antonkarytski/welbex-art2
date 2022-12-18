import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'

type DrawingProps = {
  size: number
  image: ImageSourcePropType
  style?: StyleProp<ImageStyle>
}

const DrawingItem = ({ size, image, style }: DrawingProps) => {
  return <Image source={image} style={[style, { width: size, height: size }]} />
}

export default DrawingItem
