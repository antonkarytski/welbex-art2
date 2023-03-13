import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType) {
  const list = useStore(galleryListsModel[type].$items)
  const get = galleryListsModel[type].get
  const getNext = galleryListsModel[type].getNext

  useEffect(() => {
    if (!list.length) galleryListsModel[type].get()
  }, [list, type])

  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)

  return { list, isLoading, isNextLoading, get, getNext }
}
