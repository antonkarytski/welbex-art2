import { useRef } from 'react'
import { GestureResponderEvent } from 'react-native'
import {
  Coordinates,
  calcDistanceBetweenCoords,
} from '../../lib/helpers/geometry'
import { Timer } from '../../types'

type PrevPressData = {
  timeout: Timer
  coords: Coordinates
}

type UseDoubleTapProps = {
  onPress?: () => void
  onDoublePress?: () => void
  delay?: number
  maxDistance?: number
}

const DOUBLE_PRESS_DELAY = 200
const DOUBLE_PRESS_MAX_DISTANCE = 30
export const useDoubleTap = ({
  onPress,
  onDoublePress,
  delay = DOUBLE_PRESS_DELAY,
  maxDistance = DOUBLE_PRESS_MAX_DISTANCE,
}: UseDoubleTapProps) => {
  const prevPressData = useRef<PrevPressData | null>(null)

  return (e: GestureResponderEvent) => {
    if (!onDoublePress) return onPress?.()
    const coords = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    }
    if (prevPressData.current) {
      const distance = calcDistanceBetweenCoords(
        coords,
        prevPressData.current.coords
      )
      if (distance > maxDistance) return
      clearTimeout(prevPressData.current.timeout)
      prevPressData.current = null
      onDoublePress?.()
      return
    }
    prevPressData.current = {
      timeout: setTimeout(() => {
        onPress?.()
        prevPressData.current = null
      }, delay),
      coords,
    }
  }
}
