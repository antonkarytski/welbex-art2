import { api } from '../../api'
import { ARTS_PAGE_SIZE, createPaginationListModel } from '../../api/pagination'
import { GalleryType } from './types'

const galleryBestModel = createPaginationListModel({
  request: api.arts.best,
  pageSize: ARTS_PAGE_SIZE,
})

const galleryFollowingModel = createPaginationListModel({
  request: api.arts.following,
  pageSize: ARTS_PAGE_SIZE,
})

const galleryNewModel = createPaginationListModel({
  request: api.arts.newArts,
  pageSize: ARTS_PAGE_SIZE,
})

export const galleryListsModel = {
  [GalleryType.BEST]: galleryBestModel,
  [GalleryType.FOLLOWING]: galleryFollowingModel,
  [GalleryType.NEW]: galleryNewModel,
}
