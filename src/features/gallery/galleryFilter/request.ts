import { api } from '../../../api'
import { ArtWorksFilterProps } from '../../../api/parts/arts/types'
import { createRequestModel } from '../../../lib/models/model.request'
import { createAuthSeparatedRequest } from '../../auth/helpers'
import { GalleryType } from '../types'

createAuthSeparatedRequest

export const countFilteredGalleryModel = createRequestModel(
  createAuthSeparatedRequest(
    api.arts.countOfFiltered,
    api.arts.countOfFilteredProtected
  )
)

export const galleriesModeProp: Record<GalleryType, ArtWorksFilterProps> = {
  [GalleryType.BEST]: { mode: 'best' },
  [GalleryType.FOLLOWING]: { mode: 'following' },
  [GalleryType.NEW]: { mode: 'new' },
}
