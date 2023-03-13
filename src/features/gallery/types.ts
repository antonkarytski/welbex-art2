import { links } from '../../navigation/links'
import { LangFn } from '../../translations/types'

export enum GalleryType {
  BEST = 'best',
  FOLLOWING = 'following',
  NEW = 'new',
}

export type GalleryLink =
  | links.galleryBest
  | links.galleryFollowing
  | links.galleryNew

export type GalleyDescriptor = {
  link: GalleryLink
  type: GalleryType
  title: LangFn
}

export type GalleriesList<T> = Partial<Record<GalleryType, T>>
export type GallerySetter<T> = {
  type: GalleryType
} & T
