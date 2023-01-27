import React from 'react'
import GalleryList from '../../features/gallery/GalleryList'
import { GalleryLink } from '../../features/gallery/types'
import { ScreenComponentProps } from '../../navigation/types.screenProps'

const ScreenGallery = ({ route }: ScreenComponentProps<GalleryLink>) => {
  return <GalleryList type={route.params.type} />
}

export default ScreenGallery
