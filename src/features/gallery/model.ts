import { createEvent, restore } from 'effector'
import { api } from '../../api'
import { ARTS_PAGE_SIZE } from '../../api/constants'
import { ArtWork } from '../../api/parts/arts/types'
import { createPaginationListModel } from '../../lib/models/pagination'
import { createAuthSeparatedRequest } from '../auth/helpers'
import { GALLERIES } from './descriptors'
import { GalleryType, GalleyDescriptor } from './types'

const artWorkIdExtractor = (item: Partial<ArtWork>) => item.id

const galleryModelCommonProps = {
  pageSize: ARTS_PAGE_SIZE,
  idExtractor: artWorkIdExtractor,
}

const galleryBestRequest = createAuthSeparatedRequest(
  api.arts.best,
  api.arts.bestProtected
)

const galleryNewRequest = createAuthSeparatedRequest(
  api.arts.newArts,
  api.arts.newArtsProtected
)

const galleryBestModel = createPaginationListModel({
  request: galleryBestRequest,
  ...galleryModelCommonProps,
})

const galleryFollowingModel = createPaginationListModel({
  request: api.arts.following,
  ...galleryModelCommonProps,
})

const galleryNewModel = createPaginationListModel({
  request: galleryNewRequest,
  ...galleryModelCommonProps,
})

export const galleryListsModel = {
  [GalleryType.BEST]: galleryBestModel,
  [GalleryType.FOLLOWING]: galleryFollowingModel,
  [GalleryType.NEW]: galleryNewModel,
}

export const setActiveGallery = createEvent<GalleyDescriptor>()
export const $activeGallery = restore(setActiveGallery, GALLERIES[0])

export const getGalleryListRequest = (type: GalleryType) => {
  galleryListsModel[type].get()
}
