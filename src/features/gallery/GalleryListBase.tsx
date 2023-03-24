import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ArtWork, ArtWorksFilterProps } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Loader from '../../ui/loaders/Loader'
import GallerySkeleton from '../../ui/loaders/Skeleton.Gallery'
import { drawingKeyExtractor } from '../artWork/helpers'
import { useArtWorkActions } from '../artWork/hooks'
import { useThemedStyleList } from '../themed/hooks'
import { localeAgeTextShort } from '../user/UserDescription'
import GalleryItem from './GalleryItem'
import { useGallery } from './hooks'
import { galleryItemThemedStyles } from './styles'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
  filters?: ArtWorksFilterProps | null
  getListOnMount?: boolean
  ListEmptyComponent?: React.ReactElement
}

const GalleryListBase = ({
  type,
  filters,
  getListOnMount = false,
  ListEmptyComponent,
}: GalleryListProps) => {
  const text = useText()
  const navigate = useNavigate()
  const {
    list,
    isLoading,
    isNextLoading,
    getNext,
    updateItem,
    refresh,
    isRefreshing,
  } = useGallery(type, getListOnMount)

  const getNextSync = () => {
    getNext(filters)
  }

  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })

  const { onToggleLike } = useArtWorkActions(null, updateItem)
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
          onToggleLike={onToggleLike}
        />
      )
    },
    [styles, navigate, text, onToggleLike]
  )

  if (isLoading) return <GallerySkeleton />

  return (
    <FlatList
      data={list}
      contentContainerStyle={componentStyles.contentContainer}
      renderItem={renderItem}
      keyExtractor={drawingKeyExtractor}
      onEndReached={getNextSync}
      onRefresh={refresh}
      refreshing={isRefreshing}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
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

export default GalleryListBase
