import React, { PropsWithChildren } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { defaultColors } from '../../features/themed/theme'
import { FONT_SEMI_BOLD } from '../../styles/fonts'
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
