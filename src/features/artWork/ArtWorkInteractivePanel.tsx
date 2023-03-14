import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ArtWork, ArtWorkGeneral } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'
import FavouriteButton from '../../ui/buttons/FavouriteButton'
import LikeButton from '../../ui/buttons/LikeButton'
import ShareButton from '../../ui/buttons/ShareButton'
import { $isAuth } from '../auth/model'
import { useColors } from '../themed'
import { toggleLike, toggleSave } from './request'

type ArtWorkInteractivePanelProps = {
  item: ArtWorkGeneral
  onLikeChange?: (isLiked: boolean, likes: number) => void
  onSaveChange?: (isSaved: boolean) => void
}

function isAuthorizedArtWork(item: ArtWorkGeneral | ArtWork): item is ArtWork {
  return (item as ArtWork).is_liked !== undefined
}

const ArtWorkInteractivePanel = ({
  item,
  onLikeChange,
  onSaveChange,
}: ArtWorkInteractivePanelProps) => {
  const colors = useColors()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)

  const onLikeDrawing = () => {
    if (!isAuth) return navigate(links.login)
    const likesCount = item.is_liked ? item.likes - 1 : item.likes + 1
    toggleLike(item).then(() => onLikeChange?.(!item.is_liked, likesCount))
  }

  const onSaveDrawing = () => {
    if (!isAuth) return navigate(links.login)
    toggleSave(item).then(() => onSaveChange?.(!item.is_saved))
  }

  return (
    <View>
      <View style={styles.container}>
        <LikeButton
          likesCount={item.likes}
          style={[styles.button, styles.likeButton]}
          onPress={onLikeDrawing}
          color={colors.icon}
          active={item.is_liked}
          activeColor={colors.likesIcon}
        />
        <View style={styles.interactionBlock}>
          <ShareButton
            color={colors.icon}
            style={[styles.button, styles.shareButton]}
          />
          <FavouriteButton
            color={colors.icon}
            style={[styles.button, styles.favouriteButton]}
            active={item.is_saved}
            onPress={onSaveDrawing}
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

export default ArtWorkInteractivePanel
