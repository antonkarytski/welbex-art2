import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import { useImageAutoHeight } from './helpers'

type AutoHeightImageProps = {
  image: ImageSourcePropType
  widthGenerator: () => number
  style?: StyleProp<ViewStyle>
}

const AutoHeightImage = ({
  image,
  widthGenerator,
  style,
}: AutoHeightImageProps) => {
  const [size, onImageLoad] = useImageAutoHeight(widthGenerator)

  return (
    <View style={style}>
      <Image
        source={image}
        resizeMode={'contain'}
        onLoad={({ nativeEvent }) => {
          onImageLoad(nativeEvent.source)
        }}
        borderRadius={20}
        style={{
          width: size.width,
          height: size.height,
        }}
      />
    </View>
  )
}

export default AutoHeightImage
