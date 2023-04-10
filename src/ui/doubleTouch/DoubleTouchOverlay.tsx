import React, { PropsWithChildren, useEffect, useRef } from 'react'
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleProp,
  ViewStyle,
} from 'react-native'
import {
  Coordinates,
  calcDistanceBetweenCoords,
} from '../../lib/helpers/geometry'

type DoubleTouchOverlayProps = PropsWithChildren<{
  onPress?: () => void
  maxDelay?: number
  maxRadius?: number
  style?: StyleProp<ViewStyle>
  onSinglePress?: () => void
}>

const DoubleTouchOverlay = ({
  children,
  onPress,
  onSinglePress,
  maxDelay = 300,
  maxRadius = 30,
  style,
}: DoubleTouchOverlayProps) => {
  const prevTouchTimeStamp = useRef(0)
  const prevTouchX = useRef(0)
  const prevTouchY = useRef(0)
  const onDoubleTouch = useRef(onPress)
  const isTouchedTwice = useRef(false)
  const isResponderMoving = useRef(false)

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
    prevTouchTimeStamp.current = touchTimeStamp
    prevTouchX.current = touchCoordinates.x
    prevTouchY.current = touchCoordinates.y

    if (isDoubleTouch) {
      onDoubleTouch.current?.()
      isTouchedTwice.current = true
      return
    }

    const timeout = setTimeout(() => {
      if (!isTouchedTwice.current && !isResponderMoving.current) {
        onSinglePress?.()
      }
      clearTimeout(timeout)
      isTouchedTwice.current = false
    }, maxDelay + 10)
  }

  const onPanResponderMove = () => {
    isResponderMoving.current = true
    const timeout = setTimeout(() => {
      isResponderMoving.current = false
      clearTimeout(timeout)
    }, maxDelay + 10)
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant,
      onPanResponderMove,
    })
  ).current

  return (
    <Animated.View style={[style]} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  )
}
export default DoubleTouchOverlay
