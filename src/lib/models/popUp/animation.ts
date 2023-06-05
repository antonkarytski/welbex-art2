import { Animated } from 'react-native'

export const animationInterpolate = (
  value: Animated.Value,
  inputRange: number[],
  outputRange: number[] | string[],
  extrapolate?: 'clamp'
) => {
  if (value === undefined) {
    return 0
  }
  return value.interpolate({
    inputRange,
    outputRange,
    extrapolate,
  })
}

export function fastSpringAnimation(
  value: Animated.Value | Animated.ValueXY,
  toValue: number | { x: number; y: number },
  speed = 10,
  bounciness = 3,
  useNativeDriver = true
) {
  return Animated.spring(value, {
    toValue,
    speed,
    bounciness,
    useNativeDriver,
  })
}
