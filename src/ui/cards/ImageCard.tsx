import React, { PropsWithChildren } from 'react'
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_SEMI_BOLD } from '../../styles/fonts'
import Span from '../Span'

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
  image: ImageSourcePropType | null
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  label?: string
  labelStyles?: {
    text: StyleProp<TextStyle>
    container: StyleProp<ViewStyle>
  }
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
  label,
  labelStyles,
  ...imageOptions
}: PropsWithChildren<ImageCardProps>) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {image ? (
        <>
          {label && (
            <View style={[styles.label, labelStyles?.container]}>
              <Span
                label={label}
                style={[styles.labelText, labelStyles?.text]}
              />
            </View>
          )}
          <ImageBackground
            style={[
              styles.imageBackground,
              !!imageOptions.imageHeight && {
                height: imageOptions.imageHeight,
              },
            ]}
            source={image}
            resizeMode={'cover'}
            imageStyle={[styles.image, getImageSize(imageOptions)]}
          />
        </>
      ) : (
        <View
          style={[
            styles.imageBackground,
            getImageSize(imageOptions),
            styles.noImageBackground,
          ]}
        />
      )}

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
  noImageBackground: {
    backgroundColor: '#D5DDDC',
  },
  label: {
    backgroundColor: defaultColors.detailsActive,
    position: 'absolute',
    zIndex: 2,
    right: 20,
    top: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  labelText: {
    color: defaultColors.whiteText,
    fontSize: 14,
    fontFamily: FONT_SEMI_BOLD,
    lineHeight: 17,
  },
})

export default ImageCard
