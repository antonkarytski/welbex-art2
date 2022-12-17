import React, { PropsWithChildren } from 'react'
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

type ImageOptions =
  | {
      width?: number
      height: number
      offsetY: number
    }
  | {
      height?: number
      width?: number
      offsetY?: never
    }

export type ImageCardProps = {
  image: ImageSourcePropType
  imageOptions?: ImageOptions
  style?: StyleProp<ViewStyle>
}

function getImageSize(options: ImageOptions | undefined) {
  if (!options) {
    return {
      width: '100%',
      height: '100%',
    }
  }

  if (options.offsetY) {
    return {
      height: options.height + options.offsetY,
      width: options.width ?? '100%',
    }
  }

  return {
    height: options.height ?? '100%',
    width: options.width ?? '100%',
  }
}

const ImageCard = ({
  image,
  style,
  children,
  imageOptions,
}: PropsWithChildren<ImageCardProps>) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.imageBackground}
          source={image}
          resizeMode={'cover'}
          imageStyle={[styles.image, getImageSize(imageOptions)]}
        />
      </View>

      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 235,
  },
  imageContainer: {
    overflow: 'hidden',
    height: 150,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    resizeMode: 'cover',
  },
})

export default ImageCard
