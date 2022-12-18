import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
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
    <View style={containerStyle}>
      <Image source={image} style={[style, { width: size, height: size }]} />
    </View>
  )
}

export default DrawingItem
