import { ImagePickerAsset } from 'expo-image-picker'
import { CompetitionCategory } from '../features/categories/types'
import { Drawing } from '../features/drawing/types'
import { GalleryType } from '../features/gallery/types'
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
  [links.createPostAddDescription]: { asset: ImagePickerAsset }
}>
