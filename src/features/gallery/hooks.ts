import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { $isAuth } from '../auth/model'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType, autoGetFirst = false) {
  const isAuth = useStore($isAuth)
  const list = useStore(galleryListsModel[type].$items)
  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)
  const isRefreshing = useStore(galleryListsModel[type].$isRefreshing)
  const getSync = galleryListsModel[type].getSync
  const getNextSync = galleryListsModel[type].getNextSync
  const refreshSync = galleryListsModel[type].refreshSync
  const updateItem = galleryListsModel[type].updateItem

  useEffect(() => {
    if (autoGetFirst) getSync()
  }, [getSync, autoGetFirst, isAuth])

  return {
    list,
    isLoading,
    isNextLoading,
    getSync,
    getNextSync,
    updateItem,
    refreshSync,
    isRefreshing,
  }
}
