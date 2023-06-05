import React, { useCallback, useMemo } from 'react'
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
import { useAtrWorkActions } from '../artWork/hooks'
import { useColors } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
import {
  localeAgeTextWoPrefix,
} from '../user/UserDescription'
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
  requestOptions: {},
})

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
    refreshSync,
    isRefreshing,
  } = useGallery(type, getListOnMount)
  const isAdsVisible = useIsAdsVisible()

  const { styles } = useThemedStyleList({
    item: galleryItemThemedStyles,
  })

  const { toggleLike, like } = useAtrWorkActions()
  const onPressGalleryItem = useCallback(
    (drawing: ArtWork) =>
      navigate(links.artWorkDetails, {
        item: drawing,
      }),
    [navigate]
  )

  const textGenerator = useMemo(() => {
    return localeAgeTextWoPrefix(text)
  }, [text])

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ArtWork>) => {
      return (
        <>
          {isAdsVisible && adsBannerFreq(index) && <AdsBanner />}
          <GalleryItem
            onPress={onPressGalleryItem}
            ageTextGenerator={textGenerator}
            style={styles.item}
            item={item}
            onPressLikeButton={toggleLike}
            onDoublePress={like}
            colors={colors}
          />
        </>
      )
    },
    [
      styles,
      colors,
      isAdsVisible,
      like,
      toggleLike,
      onPressGalleryItem,
      textGenerator,
    ]
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
