import React, { PropsWithChildren } from 'react'
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type ImageOptions =
  | {
      imageWidth?: number
      imageHeight: number
      imageOffsetY: number
    }
  | {
      imageHeight?: number
      imageWidth?: number
      imageOffsetY?: never
    }

export type ImageCardProps = {
  image: ImageSourcePropType
  style?: StyleProp<ViewStyle>
  onPress?: () => void
} & ImageOptions

function getImageSize(options: ImageOptions | undefined) {
  if (!options) {
    return {
      width: '100%',
      height: '100%',
    }
  }

  if (options.imageOffsetY) {
    return {
      height: options.imageHeight + options.imageOffsetY,
      width: options.imageWidth ?? '100%',
    }
  }

  return {
    height: options.imageHeight ?? '100%',
    width: options.imageWidth ?? '100%',
  }
}

const ImageCard = ({
  image,
  style,
  children,
  onPress,
  ...imageOptions
}: PropsWithChildren<ImageCardProps>) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <ImageBackground
        style={[
          styles.imageBackground,
          !!imageOptions.imageHeight && { height: imageOptions.imageHeight },
        ]}
        source={image}
        resizeMode={'cover'}
        imageStyle={[styles.image, getImageSize(imageOptions)]}
      />

      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  imageBackground: {
    width: '100%',
    overflow: 'hidden',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  image: {
    resizeMode: 'cover',
  },
})

export default ImageCard
