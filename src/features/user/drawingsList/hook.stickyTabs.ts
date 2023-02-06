import { useMemo } from 'react'
import { Animated } from 'react-native'

export function useStickyTabsStyle(
  scrollOffsetValue: Animated.Value,
  topOffset: number
) {
  const tabY = scrollOffsetValue.interpolate({
    inputRange: [0, topOffset],
    outputRange: [topOffset, 0],
    extrapolateRight: 'clamp',
  })

  return useMemo(() => {
    return { transform: [{ translateY: tabY }], zIndex: 10 }
  }, [tabY])
}
