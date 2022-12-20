import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FunctionComponent } from 'react'
import { GalleryLink } from '../../features/gallery/types'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import Span from '../../ui/Span'

type ScreenGalleryListProps = {}

const ScreenGallery = ({
  route,
}: NativeStackScreenProps<ScreensProps, GalleryLink>) => {
  return <Span>{route.name}</Span>
}

export default ScreenGallery
