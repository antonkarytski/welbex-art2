import React, { PropsWithChildren, useEffect, useRef } from 'react'
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native'
import { Coordinates, calcDistanceBetweenCoords } from '../lib/helpers/geometry'

type DoubleTouchOverlayProps = PropsWithChildren<{
  onPress?: () => void
  maxDelay?: number
  maxRadius?: number
}>

const DoubleTouchOverlay = ({
  children,
  onPress,
  maxDelay = 500,
  maxRadius = 30,
}: DoubleTouchOverlayProps) => {
  const prevTouchTimeStamp = useRef(0)
  const prevTouchX = useRef(0)
  const prevTouchY = useRef(0)
  const onDoubleTouch = useRef(onPress)

  useEffect(() => {
    onDoubleTouch.current = onPress
  }, [onPress])

  const checkDoubleTouch = (
    currentTimeStamp: number,
    currentCoordinates: Coordinates
  ) => {
    const touchesDelay = currentTimeStamp - prevTouchTimeStamp.current
    const prevTouchCoordinates = {
      x: prevTouchX.current,
      y: prevTouchY.current,
    }
    const touchesDistance = calcDistanceBetweenCoords(
      prevTouchCoordinates,
      currentCoordinates
    )
    return touchesDelay <= maxDelay && touchesDistance <= maxRadius
  }

  const onPanResponderGrant = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const touchTimeStamp = Date.now()
    const touchCoordinates = { x: gestureState.x0, y: gestureState.y0 }
    const isDoubleTouch = checkDoubleTouch(touchTimeStamp, touchCoordinates)
    if (isDoubleTouch) onDoubleTouch.current?.()
    prevTouchTimeStamp.current = touchTimeStamp
    prevTouchX.current = touchCoordinates.x
    prevTouchY.current = touchCoordinates.y
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant,
    })
  ).current

  return <View {...panResponder.panHandlers}>{children}</View>
}

export default DoubleTouchOverlay
