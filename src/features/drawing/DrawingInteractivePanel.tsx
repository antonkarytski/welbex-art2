import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import Span from '../../ui/Span'
import FavouriteButton from '../../ui/buttons/FavouriteButton'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import { useColors } from '../themed'

type DrawingInteractivePanelProps = {
  item: ArtWork
}

const DrawingInteractivePanel = ({ item }: DrawingInteractivePanelProps) => {
  const colors = useColors()

  return (
    <View>
      <View style={styles.container}>
        <LikeButton
          likesCount={item.likes}
          style={[styles.button, styles.likeButton]}
        />
        <View style={styles.interactionBlock}>
          <ShareButton
            color={colors.icon}
            style={[styles.button, styles.shareButton]}
          />
          <FavouriteButton
            color={colors.icon}
            style={[styles.button, styles.favouriteButton]}
          />
        </View>
      </View>
      <Span style={styles.title} weight={600} label={item.title} />
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
})

export default DrawingInteractivePanel
