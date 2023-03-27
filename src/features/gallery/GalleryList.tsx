import { useStore } from 'effector-react'
import React from 'react'
import Span from '../../ui/Span'
import { $isAuth } from '../auth/model'
import GalleryListBase from './GalleryListBase'
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
  const isAuth = useStore($isAuth)

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

  return (
    <GalleryListBase
      type={type}
      getListOnMount={true}
      refreshEnabled
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
    />
  )
}

export default GalleryList
