import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType) {
  const list = useStore(galleryListsModel[type].$items)
  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)
  const getSync = () => galleryListsModel[type].get()

  const getNextSync = isNextLoading
    ? undefined
    : () => galleryListsModel[type].getNext()

  const refresh = () => galleryListsModel[type].refresh()
  const updateItem = galleryListsModel[type].updateItem
  const isRefreshing = useStore(galleryListsModel[type].$isRefreshing)

  useEffect(() => {
    getSync()
  }, [])

  return {
    list,
    isLoading,
    isNextLoading,
    getSync,
    getNextSync,
    updateItem,
    refresh,
    isRefreshing,
  }
}
