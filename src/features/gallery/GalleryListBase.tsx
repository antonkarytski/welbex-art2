import React, { useCallback } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { ArtWork, ArtWorksFilterProps } from '../../api/parts/arts/types'
import { createAdsBanner } from '../../lib/ads/AdsBanner'
import { createFreqFilter } from '../../lib/ads/helpers'
import { useIsAdsVisible } from '../../lib/ads/hooks'
import { AdsName } from '../../lib/ads/list'
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
  refreshEnabled?: boolean
}

const adsBannerFreq = createFreqFilter(4, { skipFirst: true })
const AdsBanner = createAdsBanner(AdsName.GALLERY, {
  style: { marginBottom: 20, marginLeft: -20 },
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
})

const GalleryListBase = ({
  type,
  filters,
  getListOnMount = false,
  ListEmptyComponent,
  refreshEnabled,
}: GalleryListProps) => {
  const text = useText()
  const navigate = useNavigate()
  const {
    list,
    isLoading,
    isNextLoading,
    getNextSync,
    updateItem,
    refresh,
    isRefreshing,
  } = useGallery(type, getListOnMount)
  const isAdsVisible = useIsAdsVisible()

  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })

  const { onToggleLike } = useArtWorkActions(null, updateItem)
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ArtWork>) => {
      return (
        <>
          {isAdsVisible && adsBannerFreq(index) && <AdsBanner />}
          <GalleryItem
            onPress={(drawing) =>
              navigate(links.galleryDrawingDetails, { item: drawing })
            }
            ageTextGenerator={localeAgeTextShort(text)}
            style={styles.item}
            item={item}
            onToggleLike={onToggleLike}
          />
        </>
      )
    },
    [styles, navigate, text, onToggleLike, isAdsVisible]
  )

  if (isLoading) return <GallerySkeleton />

  return (
    <FlatList
      data={list}
      contentContainerStyle={componentStyles.contentContainer}
      renderItem={renderItem}
      keyExtractor={drawingKeyExtractor}
      onEndReached={() => getNextSync?.(filters)}
      onRefresh={refreshEnabled ? refresh : undefined}
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
