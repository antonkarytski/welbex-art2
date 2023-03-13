import React, { PropsWithChildren, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { defaultColors } from '../../features/themed/theme'
import { ImageGradientProps } from './types'

type ComponentImageProps = {
  source: ImageGradientProps['source']
  imageHeight: ImageGradientProps['imageHeight']
}

const ComponentImage = ({ source, imageHeight }: ComponentImageProps) => {
  return source ? (
    <Image
      resizeMode={'cover'}
      style={[styles.image, { height: imageHeight }]}
      source={source}
    />
  ) : (
    <View
      style={[styles.image, styles.imageSkeleton, { height: imageHeight }]}
    />
  )
}

const ImageAdaptiveGradient = ({
  imageHeight,
  style,
  colors,
  gradientTransform,
  startOffset,
  endOffset,
  source,
}: PropsWithChildren<ImageGradientProps>) => {
  const [height, setHeight] = useState(0)

  const imageProps = {
    source,
    imageHeight,
  }

  if (!height || height < imageHeight) {
    return (
      <View
        onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
      >
        <ComponentImage {...imageProps} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { height }, style]}>
      <Svg style={StyleSheet.absoluteFill} width={'100%'} height={'100%'}>
        <Defs>
          <LinearGradient
            id="grad"
            gradientTransform={gradientTransform ?? 'rotate(90)'}
          >
            <Stop
              offset={startOffset ?? '0%'}
              stopColor={colors?.start ?? '#000000'}
              stopOpacity={0.45}
            />
            <Stop
              offset={endOffset ?? '100%'}
              stopColor={colors?.end ?? '#000000'}
              stopOpacity={0.225}
            />
          </LinearGradient>
        </Defs>
        <Rect width={'100%'} height={'100%'} fill={'url(#grad)'} />
      </Svg>
      <ComponentImage {...imageProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  image: {
    width: '100%',
    zIndex: -1,
  },
  imageSkeleton: {
    backgroundColor: defaultColors.lightAccentDetails,
  },
})

export default ImageAdaptiveGradient
