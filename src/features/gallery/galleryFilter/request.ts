import { api } from '../../../api'
import { createRequestModel } from '../../../api/model.request'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { GalleryType } from '../types'

export const countFilteredGalleryModel = createRequestModel(
  api.arts.countOfFiltered
)

export const galleriesModeProp: Record<GalleryType, ArtWorksFilterProps> = {
  [GalleryType.BEST]: { mode: 'best' },
  [GalleryType.FOLLOWING]: { mode: 'following' },
  [GalleryType.NEW]: { mode: 'new' },
}
