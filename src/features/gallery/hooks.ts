import { useStoreMap } from 'effector-react'
import { useEffect } from 'react'
import { noop } from '../../lib/helpers'
import { $galleries } from './model'
import { getGalleryRequest } from './request'
import { GalleryType } from './types'

export function useGallery(type: GalleryType) {
  const data = useStoreMap({
    store: $galleries,
    keys: [type],
    fn: (galleries) => galleries?.[type],
  })

  useEffect(() => {
    if (!data) getGalleryRequest({ type }).catch(noop)
  }, [data, type])

  return data
}
