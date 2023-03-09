import { api } from '../../api'
import { createPaginationListModel } from '../../api/pagination'

// import { GalleryType } from './types'

export const galleryRequest = createPaginationListModel({
  pageSize: 10,
  request: api.arts.all, // TODO: change to specific type when API will be ready
})
