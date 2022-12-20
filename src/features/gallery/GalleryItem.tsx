import React from 'react'
import { View } from 'react-native'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import ImageCard from '../../ui/cards/ImageCard'
import { Drawing } from '../drawing/types'
import UserDescription from '../user/UserDescription'
import { GalleryItemStyles } from './styles'

type GalleryItemProps = {
  item: Drawing
  style: GalleryItemStyles
}

const GalleryItem = React.memo(({ item, style }: GalleryItemProps) => {
  return (
    <ImageCard style={style.container} imageHeight={240} image={item.image}>
      <View style={style.card}>
        <UserDescription
          style={{
            container: style.descriptionContainer,
            subText: style.subText,
            name: style.name,
          }}
          item={item.user}
        />
        <LikeButton style={style.likeButton} likesCount={item.likesCount} />
        <ShareButton style={style.shareButton} />
      </View>
    </ImageCard>
  )
})

export default GalleryItem
