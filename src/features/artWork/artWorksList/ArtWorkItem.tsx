import React from 'react'
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { ArtPreview, ArtWorkStatus } from '../../../api/parts/arts/types'
import WinnerIcon, { winnersIconStyles } from '../../../ui/icons/Icon.Winner'
import ModerationWorkLabel from './ModerationWorkLabel'

type ArtWorkItemProps = {
  size: number
  item: ArtPreview
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (item: ArtPreview) => void
}

const ArtWorkItem = React.memo(
  ({ size, style, containerStyle, onPress, item }: ArtWorkItemProps) => {
    return (
      <TouchableOpacity onPress={() => onPress?.(item)} style={containerStyle}>
        {!!item.is_winner && <WinnerIcon style={winnersIconStyles.container} />}
        <Image
          source={{ uri: item.image_thumbnail }}
          style={[style, { width: size, height: size }]}
        />
        {item.status_id === ArtWorkStatus.MODERATION && <ModerationWorkLabel />}
      </TouchableOpacity>
    )
  }
)

export default ArtWorkItem
