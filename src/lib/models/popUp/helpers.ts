import { Animated } from 'react-native'
import { animationInterpolate } from './animation'

export function getMoveStyle(value: Animated.Value, output = -500) {
  const translateY = animationInterpolate(value, [0, 1], [output, 0])
  return {
    transform: [{ translateY }],
  }
}

export function noop() {}
