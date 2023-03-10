import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export function useAnimatedProgress(
  value: Animated.Value | number,
  maxValue: number
) {
  const animatedValue = useRef(
    typeof value === 'number' ? new Animated.Value(value) : value
  ).current

  useEffect(() => {
    if (typeof value === 'number') {
      Animated.timing(animatedValue, {
        toValue: value,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [animatedValue, value])

  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-maxValue, 0],
  })
}
