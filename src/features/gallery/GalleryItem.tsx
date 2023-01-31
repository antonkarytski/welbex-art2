import React from 'react'
import { View } from 'react-native'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import ImageCard from '../../ui/cards/ImageCard'
import { Drawing } from '../drawing/types'
import UserDescription, { AgeTextGenerator } from '../user/UserDescription'
import { GalleryItemStyles } from './styles'

type GalleryItemProps = {
  item: Drawing
  style: GalleryItemStyles
  onPress?: (item: Drawing) => void
  ageTextGenerator?: AgeTextGenerator
}

const GalleryItem = React.memo(
  ({ item, style, onPress, ageTextGenerator }: GalleryItemProps) => {
    return (
      <ImageCard
        onPress={() => onPress?.(item)}
        style={style.container}
        imageHeight={240}
        image={item.image}
      >
        <View style={style.card}>
          <UserDescription
            style={{
              container: style.descriptionContainer,
              subText: style.subText,
              name: style.name,
            }}
            item={item.user}
            ageTextGenerator={ageTextGenerator}
            shortenCountryName
          />
          <LikeButton style={style.likeButton} likesCount={item.likesCount} />
          <ShareButton style={style.shareButton} />
        </View>
      </ImageCard>
    )
  }
)

export default GalleryItem
