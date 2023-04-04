import React, { PropsWithChildren, useRef } from 'react'
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import {
  Coordinates,
  calcDistanceBetweenCoords,
} from '../../lib/helpers/geometry'
import { FONT_SEMI_BOLD } from '../../styles/fonts'
import { Timer } from '../../types'
import ImageCardContent from './ImageCardContent'

export type ImageOptions =
  | {
      imageWidth?: number
      imageHeight: number
      imageOffsetY: number
    }
  | {
      imageHeight?: number
      imageWidth?: number
      imageOffsetY?: never
    }

export type ImageCardProps = {
  image: ImageSourcePropType | null
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  onDoublePress?: () => void
  label?: string
  labelStyles?: {
    text: StyleProp<TextStyle>
    container: StyleProp<ViewStyle>
  }
} & ImageOptions

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
const useDoubleTap = ({
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

const ImageCard = ({
  style,
  onPress,
  onDoublePress,
  ...props
}: PropsWithChildren<ImageCardProps>) => {
  const pressHandler = useDoubleTap({ onPress, onDoublePress })

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={pressHandler}
      style={[styles.container, style]}
    >
      <ImageCardContent {...props} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  imageBackground: {
    width: '100%',
    overflow: 'hidden',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  image: {
    resizeMode: 'cover',
  },
  noImageBackground: {
    backgroundColor: '#D5DDDC',
  },
  label: {
    backgroundColor: defaultColors.detailsActive,
    position: 'absolute',
    zIndex: 2,
    right: 20,
    top: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  labelText: {
    color: defaultColors.whiteText,
    fontSize: 14,
    fontFamily: FONT_SEMI_BOLD,
    lineHeight: 17,
  },
})

export default ImageCard
