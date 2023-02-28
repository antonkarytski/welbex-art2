import { useStore, useStoreMap } from 'effector-react'
import { useEffect } from 'react'
import { noop } from '../../lib/helpers'
import { $galleries } from './model'
import { galleryRequest, getGalleryRequest } from './request'
import { GalleryType } from './types'

// export function useGallery(type: GalleryType) {
//   const data = useStoreMap({
//     store: $galleries,
//     keys: [type],
//     fn: (galleries) => galleries?.[type],
//   })

//   useEffect(() => {
//     if (!data) getGalleryRequest({ type }).catch(noop)
//   }, [data, type])

//   return data
// }

export function useGallery(type: GalleryType) {
  const data = useStore(galleryRequest.$items)
  useEffect(() => {
    if (!data.length) galleryRequest.get()
  }, [data, type])

  return data
}
