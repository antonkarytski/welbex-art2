import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { ArtWorksFilterProps } from '../../api/parts/arts/types'
import { noop } from '../../lib/helpers'
import { galleryListsModel } from './model'
import { GalleryType } from './types'

export function useGallery(type: GalleryType, autoGetFirst: boolean = false) {
  const list = useStore(galleryListsModel[type].$items)
  const isLoading = useStore(galleryListsModel[type].$isLoading)
  const isNextLoading = useStore(galleryListsModel[type].$isNextLoading)
  const isRefreshing = useStore(galleryListsModel[type].$isRefreshing)
  const get = galleryListsModel[type].get
  const getNext = galleryListsModel[type].getNext
  const getSync = galleryListsModel[type].getSync

  const getNextSync = isNextLoading
    ? undefined
    : (props?: ArtWorksFilterProps | null) =>
        galleryListsModel[type].getNext(props).catch(noop)

  const refresh = () => galleryListsModel[type].refresh().catch(noop)
  const updateItem = galleryListsModel[type].updateItem

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
