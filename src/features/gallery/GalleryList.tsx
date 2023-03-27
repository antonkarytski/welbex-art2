import { useStore } from 'effector-react'
import React, { useCallback } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { createAdsBanner } from '../../lib/ads/AdsBanner'
import { createFreqFilter } from '../../lib/ads/helpers'
import { useIsAdsVisible } from '../../lib/ads/hooks'
import { AdsName } from '../../lib/ads/list'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import Loader from '../../ui/loaders/Loader'
import GallerySkeleton from '../../ui/loaders/Skeleton.Gallery'
import { drawingKeyExtractor } from '../artWork/helpers'
import { toggleLike } from '../artWork/request'
import { $isAuth } from '../auth/model'
import { useThemedStyleList } from '../themed/hooks'
import { localeAgeTextShort } from '../user/UserDescription'
import GalleryItem from './GalleryItem'
import { useGallery } from './hooks'
import { galleryItemThemedStyles } from './styles'
import { GalleryType } from './types'

type GalleryListProps = {
  type: GalleryType
}

const adsBannerFreq = createFreqFilter(4, { skipFirst: true })
const AdsBanner = createAdsBanner(AdsName.GALLERY, {
  style: { marginBottom: 20, marginLeft: -20 },
  requestOptions: {
    requestNonPersonalizedAdsOnly: true,
  },
})

const GalleryList = ({ type }: GalleryListProps) => {
  const text = useText()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const {
    list,
    isLoading,
    isNextLoading,
    getNextSync,
    updateItem,
    refresh,
    isRefreshing,
  } = useGallery(type)

  const isAdsVisible = useIsAdsVisible()
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
    [isAuth, navigate, updateItem]
  )

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
            onLikeDrawing={onLikeDrawing}
          />
        </>
      )
    },
    [styles, navigate, text, onLikeDrawing, isAdsVisible]
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
      ListEmptyComponent={
        // TODO: Component when design will ready
        <Span
          label={
            !isAuth && type === GalleryType.FOLLOWING
              ? 'You need to login to view this gallery'
              : 'No drawings yet'
          }
        />
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
