import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { AGE_CATEGORIES } from '../../constants/categories'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import ImageCard from '../../ui/cards/ImageCard'
import WinnerIcon, { winnersIconStyles } from '../../ui/icons/Icon.Winner'
import { rangeToString } from '../filters/ages'
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

const getAgeCategoryLabel = (
  item: ArtWork,
  textGenerator?: AgeTextGenerator
) => {
  const category = AGE_CATEGORIES[item.age_category_id]
  if (category) {
    const rangeString = rangeToString(category)
    return textGenerator?.(category[1], rangeToString(category)) ?? rangeString
  }
  return item.author.age
    ? textGenerator?.(item.author.age) ?? item.author.age.toString()
    : ''
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
        {!!item.is_winner && <WinnerIcon style={winnersIconStyles.container} />}
        <View style={style.card}>
          <UserDescription
            style={{
              container: style.descriptionContainer,
              subText: style.subText,
              name: style.name,
            }}
            item={item.author}
            ageTextGenerator={() => getAgeCategoryLabel(item, ageTextGenerator)}
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
