import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { galleryRequest } from './request'
import { GalleryType } from './types'

export function useGallery(type: GalleryType) {
  const data = useStore(galleryRequest.$items)
  useEffect(() => {
    if (!data.length) galleryRequest.get()
  }, [data, type])

  return data
}
