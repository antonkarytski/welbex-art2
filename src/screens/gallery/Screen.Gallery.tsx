import React, { useEffect } from 'react'
import GalleryList from '../../features/gallery/GalleryList'
import { GALLERIES } from '../../features/gallery/descriptors'
import { setActiveGallery } from '../../features/gallery/model'
import { GalleryLink } from '../../features/gallery/types'
import { ScreenComponentProps } from '../../navigation/types.screenProps'

const ScreenGallery = ({
  route,
  navigation,
}: ScreenComponentProps<GalleryLink>) => {
  const galleryType = route.params.type

  useEffect(() => {
    navigation.addListener('focus', () => {
      setActiveGallery(
        GALLERIES.find(({ type }) => galleryType === type) || GALLERIES[0]
      )
    })
  }, [navigation, galleryType])

  return <GalleryList type={galleryType} />
}

export default ScreenGallery
