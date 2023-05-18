import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ArtWorkGeneral } from '../../api/parts/arts/types'
import FavouriteButton from '../../ui/buttons/FavouriteButton'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import { useColors } from '../themed'

type ArtWorkInteractivePanelProps = {
  item: ArtWorkGeneral
  onPressLike: () => void
  onPressSave: () => void
}

const ArtWorkInteractivePanel = ({
  item,
  onPressLike,
  onPressSave,
}: ArtWorkInteractivePanelProps) => {
  const colors = useColors()

  return (
    <View style={styles.container}>
      <LikeButton
        likesCount={item.likes}
        style={[styles.button, styles.likeButton]}
        onPress={onPressLike}
        color={colors.icon}
        active={item.is_liked}
        activeColor={colors.likesIcon}
      />
      <View style={styles.interactionBlock}>
        <ShareButton
          color={colors.icon}
          style={[styles.button, styles.shareButton]}
          item={{
            url: item.image_thumbnail,
            title: item.title,
          }}
        />
        <FavouriteButton
          color={colors.icon}
          style={[styles.button, styles.favouriteButton]}
          active={item.is_saved}
          onPress={onPressSave}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionBlock: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 12,
  },
  shareButton: {
    paddingHorizontal: 20,
  },
  favouriteButton: {
    paddingLeft: 20,
    paddingRight: 4,
  },
  likeButton: {
    paddingRight: 20,
    paddingLeft: 4,
  },
})

export default ArtWorkInteractivePanel
