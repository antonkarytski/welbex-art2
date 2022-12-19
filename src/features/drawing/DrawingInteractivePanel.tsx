import React from 'react'
import { StyleSheet, View } from 'react-native'
import FavouriteButton from '../../ui/buttons/FavouriteButton'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import { useColors } from '../themed'

type DrawingInteractivePanelProps = {}

const DrawingInteractivePanel = ({}: DrawingInteractivePanelProps) => {
  const colors = useColors()

  return (
    <View style={styles.container}>
      <LikeButton likesCount={110} style={[styles.button, styles.likeButton]} />
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
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
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

export default DrawingInteractivePanel
