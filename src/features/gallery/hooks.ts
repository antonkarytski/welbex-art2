import { useStore } from 'effector-react'
import { useCallback, useEffect, useState } from 'react'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType) {
  const list = useStore(galleryListsModel[type].$items)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)
  const get = galleryListsModel[type].get
  const getNext = galleryListsModel[type].getNext
  const updateItem = galleryListsModel[type].updateItem

  useEffect(() => {
    if (!list.length) galleryListsModel[type].get()
  }, [list, type])

  const getFirst = useCallback(() => {
    galleryListsModel[type].get()
  }, [type])

  const refresh = useCallback(() => {
    setIsRefreshing(true)
    get().finally(() => {
      setIsRefreshing(false)
    })
  }, [get])

  return {
    getFirst,
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
