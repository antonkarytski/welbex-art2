import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImagePickerResult } from 'expo-image-picker'
import { CompetitionCategory } from '../features/categories/types'
import { Drawing } from '../features/drawing/types'
import { GalleryType } from '../features/gallery/types'
import { User } from '../features/user/types'
import { links } from './links'

type ScreensPropsProto<T extends Partial<Record<links, any>>> = T &
  Record<Exclude<links, keyof T>, undefined>

export type ScreensProps = ScreensPropsProto<{
  [links.categoryDetails]: { item: CompetitionCategory }
  [links.drawingDetails]: { item: Drawing }
  [links.galleryDrawingDetails]: { item: Drawing }
  [links.galleryBest]: { type: GalleryType.BEST }
  [links.galleryNew]: { type: GalleryType.NEW }
  [links.galleryFollowing]: { type: GalleryType.FOLLOWING }
  [links.createPostAddDescription]: {
    assets: Exclude<ImagePickerResult['assets'], null>
  }
  [links.userProfile]: { item: User }
}>

export type RouterScreenProps<L extends links> = NativeStackScreenProps<
  ScreensProps,
  L
>
