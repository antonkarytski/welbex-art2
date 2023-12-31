import React from 'react'
import { Animated, StyleSheet, ViewStyle } from 'react-native'
import Gradient from './Gradient'
import { MotionGradientColors } from './types'

import AnimatedProps = Animated.AnimatedProps

type MotionGradientProps = {
  colors?: MotionGradientColors
  offsetValue: Animated.Value | Animated.AnimatedInterpolation<number>
  minHeight: number
  maxHeight: number
  stopOffset?: string
  startOffset?: string
}

const MotionGradient = React.memo(
  ({
    colors,
    offsetValue,
    minHeight,
    maxHeight,
    ...props
  }: MotionGradientProps) => {
    const translateY = offsetValue.interpolate({
      inputRange: [0, maxHeight - minHeight],
      outputRange: [maxHeight, minHeight],
      extrapolateRight: 'clamp',
    })

    const overlayAnimatedStyles: AnimatedProps<ViewStyle> = {
      transform: [{ translateY }],
    }
    if (colors?.overlay) overlayAnimatedStyles.backgroundColor = colors.overlay
    const gradientStyles = { height: maxHeight }

    return (
      <>
        <Gradient
          key={maxHeight}
          style={[styles.gradient, gradientStyles]}
          colors={colors}
          {...props}
        />
        <Animated.View style={[styles.overlay, overlayAnimatedStyles]} />
      </>
    )
  }
)

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: 1000,
  },
})

export default MotionGradient
