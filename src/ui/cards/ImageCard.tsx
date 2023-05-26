import React, { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { useDoubleTap } from '../doubleTouch/hooks'
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
  cached?: boolean
  image: { uri: string } | null
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  onDoublePress?: () => void
  label?: string
  labelStyles?: {
    text: StyleProp<TextStyle>
    container: StyleProp<ViewStyle>
  }
} & ImageOptions

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
    backgroundColor: '#FFF',
  },
})

export default ImageCard
