import { api } from '../../../api'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { createRequestModel } from '../../../lib/models/model.request'
import { GalleryType } from '../types'

export const countFilteredGalleryModel = createRequestModel(
  api.arts.countOfFiltered
)

export const galleriesModeProp: Record<GalleryType, ArtWorksFilterProps> = {
  [GalleryType.BEST]: { mode: 'best' },
  [GalleryType.FOLLOWING]: { mode: 'following' },
  [GalleryType.NEW]: { mode: 'new' },
}
