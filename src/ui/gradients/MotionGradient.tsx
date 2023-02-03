import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import Gradient from './Gradient'
import { MotionGradientColors } from './types'

type MotionGradientProps = {
  colors?: MotionGradientColors
  offsetValue: Animated.Value | Animated.AnimatedInterpolation<number>
  minHeight: number
  maxHeight: number
}

const MotionGradient = ({
  colors,
  offsetValue,
  minHeight,
  maxHeight,
}: MotionGradientProps) => {
  const translateY = offsetValue.interpolate({
    inputRange: [0, maxHeight - minHeight],
    outputRange: [maxHeight, minHeight],
    extrapolateRight: 'clamp',
  })

  const overlayAnimatedStyles = {
    transform: [{ translateY }],
    backgroundColor: colors?.overlay,
  }
  const gradientStyles = { height: maxHeight }

  return (
    <>
      <Gradient
        key={maxHeight}
        style={[styles.gradient, gradientStyles]}
        colors={colors}
      />
      <Animated.View style={[styles.overlay, overlayAnimatedStyles]} />
    </>
  )
}

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
