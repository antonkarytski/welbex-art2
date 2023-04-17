import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ArtWork, ArtWorkGeneral } from '../../api/parts/arts/types'
import Span from '../../ui/Span'
import FavouriteButton from '../../ui/buttons/FavouriteButton'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import { createThemedStyle, useColors } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type ArtWorkInteractivePanelProps = {
  item: ArtWorkGeneral
  onPressLike: () => void
  onPressSave: () => void
}

function isAuthorizedArtWork(item: ArtWorkGeneral | ArtWork): item is ArtWork {
  return (item as ArtWork).is_liked !== undefined
}

const ArtWorkInteractivePanel = ({
  item,
  onPressLike,
  onPressSave,
}: ArtWorkInteractivePanelProps) => {
  const { colors, styles } = useThemedStyleList({
    common: themedStyles,
  })

  return (
    <View>
      <View style={styles.common.container}>
        <LikeButton
          likesCount={item.likes}
          style={[styles.common.button, styles.common.likeButton]}
          onPress={onPressLike}
          color={colors.icon}
          active={item.is_liked}
          activeColor={colors.likesIcon}
        />
        <View style={styles.common.interactionBlock}>
          <ShareButton
            color={colors.icon}
            style={[styles.common.button, styles.common.shareButton]}
            item={{
              url: item.image_thumbnail,
              title: item.title,
            }}
          />
          <FavouriteButton
            color={colors.icon}
            style={[styles.common.button, styles.common.favouriteButton]}
            active={item.is_saved}
            onPress={onPressSave}
          />
        </View>
      </View>
      <Span style={styles.common.title} weight={600} label={item.title} />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingTop: 12,
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
    title: {
      color: colors.text,
      fontSize: 16,
    },
  })
)

export default ArtWorkInteractivePanel
