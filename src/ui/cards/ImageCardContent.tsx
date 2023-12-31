import React, { PropsWithChildren } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { defaultColors } from '../../features/themed/theme'
import { FONT_SEMI_BOLD } from '../../styles/fonts'
import Span from '../Span'
import { ImageCardProps, ImageOptions } from './ImageCard'

type ImageCardContentProps = Omit<
  ImageCardProps,
  'onPress' | 'onDoublePress' | 'style'
>

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

type ImageValueProps = {
  cached?: boolean
  options: ImageOptions
  image: { uri: string }
  fullRound?: boolean
}

const ImageValue = ({ cached, options, image, fullRound }: ImageValueProps) => {
  const style = [
    styles.imageBackground,
    !!options.imageHeight && {
      height: options.imageHeight,
    },
    fullRound && styles.fullRound,
  ]

  if (!cached) {
    return (
      <ImageBackground
        style={style}
        source={image}
        resizeMode={'cover'}
        imageStyle={[styles.image, getImageSize(options)]}
      />
    )
  }

  return <FastImage style={style} source={image} resizeMode={'cover'} />
}

const ImageCardContent = React.memo(
  ({
    image,
    children,
    label,
    labelStyles,
    imageWidth,
    imageHeight,
    imageOffsetY,
    cached,
  }: PropsWithChildren<ImageCardContentProps>) => {
    const imageOptions = {
      imageWidth,
      imageHeight,
      imageOffsetY,
    } as ImageOptions

    return (
      <>
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
            <ImageValue
              fullRound={!children}
              cached={cached}
              image={image}
              options={imageOptions}
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
      </>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  fullRound: {
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

export default ImageCardContent
