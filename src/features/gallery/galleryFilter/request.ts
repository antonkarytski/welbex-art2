import { api } from '../../../api'
import { createRequestModel } from '../../../api/model.request'
import { GalleryType } from '../types'

const filterCountBestModel = createRequestModel(api.arts.countOfFiltered)

const filterCountFollowingModel = createRequestModel(api.arts.countOfFiltered)

const filterCountNewModel = createRequestModel(api.arts.countOfFiltered)

export const countFilteredGalleryModel = {
  [GalleryType.BEST]: filterCountBestModel,
  [GalleryType.FOLLOWING]: filterCountFollowingModel,
  [GalleryType.NEW]: filterCountNewModel,
}
