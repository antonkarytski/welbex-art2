import { api } from '../../api'
import { createRequestModel } from '../../api/model.request'
import { ARTS_PAGE_SIZE, createPaginationListModel } from '../../api/pagination'
import { SpecificCategoryResponse } from '../../api/parts/categories/types'

const CATEGORIES_PAGE_SIZE = 5

export const categoriesRequest = createPaginationListModel({
  pageSize: CATEGORIES_PAGE_SIZE,
  request: api.categories.all,
})


export const categoryRequest = createRequestModel<SpecificCategoryResponse>(
  api.categories.specific
)

export const categoryArtsRequest = createPaginationListModel({
  pageSize: ARTS_PAGE_SIZE,
  request: api.categories.artWorks,
})
