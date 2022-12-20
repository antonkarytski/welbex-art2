import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import GalleryList from '../../features/gallery/GalleryList'
import { GalleryLink } from '../../features/gallery/types'
import { ScreensProps } from '../../navigation/types.screenProps'

const ScreenGallery = ({
  route,
}: NativeStackScreenProps<ScreensProps, GalleryLink>) => {
  return <GalleryList type={route.params.type} />
}

export default ScreenGallery
