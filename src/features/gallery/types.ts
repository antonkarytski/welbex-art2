import { links } from '../../navigation/links'
import { LangFn } from '../../translations/types'

export enum GalleryType {
  BEST = 1,
  FOLLOWING,
  NEW,
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
