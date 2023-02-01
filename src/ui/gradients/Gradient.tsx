import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Svg, {
  Defs,
  Image,
  LinearGradient,
  Pattern,
  Rect,
  Stop,
} from 'react-native-svg'

export type GradientColors = {
  start?: string
  end?: string
}

export type GradientsProps = {
  style?: StyleProp<ViewStyle>
  startColor?: string
  endColor?: string
  colors?: GradientColors
}

const noise = require('../../../assets/images/noise.png')

const Gradient = ({
  children,
  style,
  startColor = '#46959B',
  endColor = '#94C9CD',
  colors,
}: PropsWithChildren<GradientsProps>) => {
  return (
    <View style={[styles.container, style]}>
      <Svg style={StyleSheet.absoluteFill} width={'100%'} height={'100%'}>
        <Defs>
          <LinearGradient id="grad" gradientTransform="rotate(90)">
            <Stop offset="0%" stopColor={colors?.start ?? startColor} />
            <Stop offset="100%" stopColor={colors?.end ?? endColor} />
          </LinearGradient>
          <Pattern
            id="noise"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="220"
            height="220"
          >
            <Image href={noise} />
          </Pattern>
        </Defs>

        <Rect width={'100%'} height={'100%'} fill={'url(#grad)'} />
        <Rect
          width={'100%'}
          height={'100%'}
          opacity={0.1}
          fill={'url(#noise)'}
        />
      </Svg>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
})

export default Gradient
