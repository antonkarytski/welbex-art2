import React from 'react'
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { ArtWorkPreviewResponse } from '../../api/parts/categories/types'

type ArtWorkItemProps = {
  size: number
  item: ArtWorkPreviewResponse
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (item: ArtWorkPreviewResponse) => void
}

const ArtWorkItem = React.memo(
  ({ size, style, containerStyle, onPress, item }: ArtWorkItemProps) => {
    return (
      <TouchableOpacity onPress={() => onPress?.(item)} style={containerStyle}>
        <Image
          source={{ uri: item.image_thumbnail }}
          style={[style, { width: size, height: size }]}
        />
      </TouchableOpacity>
    )
  }
)

export default ArtWorkItem