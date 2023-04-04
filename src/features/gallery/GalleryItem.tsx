import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import ImageCard from '../../ui/cards/ImageCard'
import { ColorThemeStructure } from '../themed/theme'
import UserDescription, { AgeTextGenerator } from '../user/UserDescription'
import { GalleryItemStyles } from './styles'

type GalleryItemProps = {
  item: ArtWork
  style: GalleryItemStyles
  onPress?: (item: ArtWork) => void
  onDoublePress?: (item: ArtWork) => void
  ageTextGenerator?: AgeTextGenerator
  onPressLikeButton: (item: ArtWork) => void
  colors: ColorThemeStructure
}

const GalleryItem = React.memo(
  ({
    item,
    style,
    onPress,
    onDoublePress,
    ageTextGenerator,
    onPressLikeButton,
    colors,
  }: GalleryItemProps) => {
    const handleDoublePressLike = useCallback(() => {
      onDoublePress?.(item)
    }, [item, onDoublePress])

    const handlePress = useCallback(() => {
      onPress?.(item)
    }, [item, onPress])

    return (
      <ImageCard
        onPress={handlePress}
        onDoublePress={handleDoublePressLike}
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
            onPress={() => onPressLikeButton(item)}
          />
          <ShareButton
            style={style.shareButton}
            item={{
              url: item.image_thumbnail,
            }}
          />
        </View>
      </ImageCard>
    )
  }
)

export default GalleryItem
