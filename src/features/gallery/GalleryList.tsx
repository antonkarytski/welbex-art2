import { useStore } from 'effector-react'
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Loader from '../../ui/loaders/Loader'
import { $isAuth } from '../auth/model'
import { drawingKeyExtractor } from '../artWork/helpers'
import { toggleLike } from '../drawing/request'
import { useThemedStyleList } from '../themed/hooks'
import { localeAgeTextShort } from '../user/UserDescription'
import GalleryItem from './GalleryItem'
import { useGallery } from './hooks'
import { galleryItemThemedStyles } from './styles'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
}

const GalleryList = ({ type }: GalleryListProps) => {
  const text = useText()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const {
    list,
    isLoading,
    isNextLoading,
    getNext,
    updateItem,
    refresh,
    isRefreshing,
  } = useGallery(type)

  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })

  const onLikeDrawing = useCallback(
    (item: ArtWork) => {
      if (!isAuth) return navigate(links.login)
      const likesCount = item.is_liked ? item.likes - 1 : item.likes + 1
      toggleLike(item).then(() =>
        updateItem({ ...item, is_liked: !item.is_liked, likes: likesCount })
      )
    },
    [isAuth, toggleLike, navigate]
  )

  const renderItem = useCallback(
    ({ item }: { item: ArtWork }) => {
      return (
        <GalleryItem
          onPress={(drawing) =>
            navigate(links.galleryDrawingDetails, { item: drawing })
          }
          ageTextGenerator={localeAgeTextShort(text)}
          style={styles.item}
          item={item}
          onLikeDrawing={onLikeDrawing}
        />
      )
    },
    [styles, navigate, text, onLikeDrawing]
  )

  const getNextPage = () => {
    getNext()
  }

  return (
    <FlatList
      data={list}
      contentContainerStyle={componentStyles.contentContainer}
      renderItem={renderItem}
      keyExtractor={drawingKeyExtractor}
      onEndReached={getNextPage}
      onRefresh={refresh}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        // TODO: Component when design will ready
        isLoading ? (
          <Loader />
        ) : (
          <Span
            label={
              !isAuth && type === GalleryType.FOLLOWING
                ? 'You need to login to view this gallery'
                : 'No drawings yet'
            }
          />
        )
        // TODO ---------
      }
      ListFooterComponent={isNextLoading ? <Loader /> : null}
    />
  )
}

const componentStyles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
})

export default GalleryList
