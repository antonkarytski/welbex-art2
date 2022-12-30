import { Animated } from 'react-native'
import { animationInterpolate } from 'altek-toolkit'

export function getMoveStyle(value: Animated.Value, output = -500) {
  const translateY = animationInterpolate(value, [0, 1], [output, 0])
  return {
    transform: [{ translateY }],
  }
}
