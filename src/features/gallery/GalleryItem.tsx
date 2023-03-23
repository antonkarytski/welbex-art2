import React from 'react'
import { View } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import ImageCard from '../../ui/cards/ImageCard'
import { useColors } from '../themed'
import UserDescription, { AgeTextGenerator } from '../user/UserDescription'
import { GalleryItemStyles } from './styles'

type GalleryItemProps = {
  item: ArtWork
  style: GalleryItemStyles
  onPress?: (item: ArtWork) => void
  ageTextGenerator?: AgeTextGenerator
  onToggleLike: (item: ArtWork) => void
}

const GalleryItem = React.memo(
  ({
    item,
    style,
    onPress,
    ageTextGenerator,
    onToggleLike,
  }: GalleryItemProps) => {
    const colors = useColors()
    const handleToggleLike = () => onToggleLike(item)

    return (
      <ImageCard
        onPress={() => onPress?.(item)}
        style={style.container}
        imageHeight={240}
        image={{ uri: item.image_thumbnail }}
        label={item.competition.category.name}
      >
        <View style={style.card}>
          <UserDescription
            style={{
              container: style.descriptionContainer,
              subText: style.subText,
              name: style.name,
            }}
            item={item.author}
            ageTextGenerator={ageTextGenerator}
            shortenCountryName
            shortenUserName
          />
          <LikeButton
            style={style.likeButton}
            likesCount={item.likes}
            color={colors.icon}
            active={item.is_liked}
            activeColor={colors.likesIcon}
            onPress={handleToggleLike}
          />
          <ShareButton style={style.shareButton} />
        </View>
      </ImageCard>
    )
  }
)

export default GalleryItem
