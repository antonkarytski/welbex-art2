import { useStore } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType) {
  const list = useStore(galleryListsModel[type].$items)
  const [isRefreshing, setIsrefreshing] = useState(false)
  const get = galleryListsModel[type].get
  const getNext = galleryListsModel[type].getNext
  const updateItem = galleryListsModel[type].updateItem

  const refresh = useCallback(() => {
    setIsrefreshing(true)
    get().finally(() => {
      setIsrefreshing(false)
    })
  }, [get])

  useEffect(() => {
    if (!list.length) galleryListsModel[type].get()
  }, [list, type])

  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)

  return {
    list,
    isLoading,
    isNextLoading,
    get,
    getNext,
    updateItem,
    refresh,
    isRefreshing,
  }
}
