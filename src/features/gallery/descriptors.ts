import { useStore } from 'effector-react'
import { links } from '../../navigation/links'
import { $isAuth } from '../auth/model'
import { GalleryType, GalleyDescriptor } from './types'

export const GALLERIES: GalleyDescriptor[] = [
  {
    link: links.galleryBest,
    type: GalleryType.BEST,
    title: (t) => t.best,
    isProtected: false,
  },
  {
    link: links.galleryFollowing,
    type: GalleryType.FOLLOWING,
    title: (t) => t.following,
    isProtected: true,
  },
  {
    link: links.galleryNew,
    type: GalleryType.NEW,
    title: (t) => t.new,
    isProtected: false,
  },
]

export const useGalleriesDescriptors = () => {
  const isAuth = useStore($isAuth)
  if (!isAuth) {
    return GALLERIES.filter(({ isProtected }) => !isProtected)
  }
  return GALLERIES
}
