import { links } from '../../navigation/links'
import { GalleryType, GalleyDescriptor } from './types'

export const GALLERIES: GalleyDescriptor[] = [
  { link: links.galleryBest, type: GalleryType.BEST, title: (t) => t.best },
  {
    link: links.galleryFollowing,
    type: GalleryType.FOLLOWING,
    title: (t) => t.following,
  },
  { link: links.galleryNew, type: GalleryType.NEW, title: (t) => t.new },
]
