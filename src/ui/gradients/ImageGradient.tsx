import React, { PropsWithChildren, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { ImageGradientProps } from './types'

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

  if (!height || height < imageHeight) {
    return (
      <View
        onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
      >
        <Image
          resizeMode={'cover'}
          style={[styles.image, { height: imageHeight }]}
          source={source}
        />
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
            />
            <Stop
              offset={endOffset ?? '100%'}
              stopColor={colors?.end ?? '#D5DDDC'}
            />
          </LinearGradient>
        </Defs>
        <Rect
          width={'100%'}
          height={'100%'}
          fill={'url(#grad)'}
          opacity={0.15}
        />
      </Svg>
      <Image
        resizeMode={'cover'}
        style={[styles.image, { height: imageHeight }]}
        source={source}
      />
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
})

export default ImageAdaptiveGradient
