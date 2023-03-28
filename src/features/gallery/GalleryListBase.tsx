import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ArtWork, ArtWorksFilterProps } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Loader from '../../ui/loaders/Loader'
import GallerySkeleton from '../../ui/loaders/Skeleton.Gallery'
import { drawingKeyExtractor } from '../artWork/helpers'
import { useAtrWorkActions } from '../artWork/hooks'
import { useColors } from '../themed'
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
  refreshEnabled?: boolean
}

const GalleryListBase = ({
  type,
  filters,
  getListOnMount = false,
  ListEmptyComponent,
  refreshEnabled,
}: GalleryListProps) => {
  const text = useText()
  const colors = useColors()
  const navigate = useNavigate()
  const {
    list,
    isLoading,
    isNextLoading,
    getNextSync,
    updateItem,
    refreshSync,
    isRefreshing,
  } = useGallery(type, getListOnMount)

  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })

  const { toggleLike } = useAtrWorkActions(null, updateItem)

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
          onPressLikeButton={toggleLike}
          colors={colors}
        />
      )
    }, // eslint-disable-next-line
    [styles, navigate, text, colors]
  )

  if (isLoading) return <GallerySkeleton />

  return (
    <FlatList
      data={list}
      contentContainerStyle={componentStyles.contentContainer}
      renderItem={renderItem}
      keyExtractor={drawingKeyExtractor}
      onEndReached={() => getNextSync?.(filters)}
      onRefresh={refreshEnabled ? refreshSync : undefined}
      refreshing={refreshEnabled ? isRefreshing : undefined}
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
