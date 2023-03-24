import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType, autoGetFirst: boolean = false) {
  const list = useStore(galleryListsModel[type].$items)
  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)
  const get = galleryListsModel[type].get
  const getNext = galleryListsModel[type].getNext
  const getSync = galleryListsModel[type].getSync

  const getNextSync = isNextLoading
    ? undefined
    : () => galleryListsModel[type].getNext()

  const refresh = () => galleryListsModel[type].refresh()
  const updateItem = galleryListsModel[type].updateItem
  const isRefreshing = useStore(galleryListsModel[type].$isRefreshing)

  useEffect(() => {
    if (autoGetFirst) getSync()
  }, [getSync, autoGetFirst])

  return {
    get,
    list,
    isLoading,
    isNextLoading,
    getSync,
    getNextSync,
    getNext,
    updateItem,
    refresh,
    isRefreshing,
  }
}
