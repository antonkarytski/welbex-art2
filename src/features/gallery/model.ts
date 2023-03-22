import { api } from '../../api'
import { ARTS_PAGE_SIZE } from '../../api/constants'
import { ArtWork } from '../../api/parts/arts/types'
import { createPaginationListModel } from '../../lib/models/pagination'
import { GalleryType } from './types'

const artWorkIdExtractor = (item: Partial<ArtWork>) => item.id

const galleryBestModel = createPaginationListModel({
  request: api.arts.best,
  pageSize: ARTS_PAGE_SIZE,
  idExtractor: artWorkIdExtractor,
})

const galleryFollowingModel = createPaginationListModel({
  request: api.arts.following,
  pageSize: ARTS_PAGE_SIZE,
  idExtractor: artWorkIdExtractor,
})

const galleryNewModel = createPaginationListModel({
  request: api.arts.newArts,
  pageSize: ARTS_PAGE_SIZE,
  idExtractor: artWorkIdExtractor,
})

export const galleryListsModel = {
  [GalleryType.BEST]: galleryBestModel,
  [GalleryType.FOLLOWING]: galleryFollowingModel,
  [GalleryType.NEW]: galleryNewModel,
}
