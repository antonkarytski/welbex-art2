import { api } from '../../api'
import { createRequestModel } from '../../api/model.request'
import { ARTS_PAGE_SIZE, createPaginationListModel } from '../../api/pagination'

const CATEGORIES_PAGE_SIZE = 5

export const categoriesListModel = createPaginationListModel({
  pageSize: CATEGORIES_PAGE_SIZE,
  request: api.categories.all,
})

export const categoryDetailsModel = createRequestModel(api.categories.specific)

export const categoryArtsModel = createPaginationListModel({
  pageSize: ARTS_PAGE_SIZE,
  request: api.arts.all,
})

export const getCategoryData = (categoryId: number) => {
  return Promise.all([
    categoryDetailsModel.get(categoryId),
    categoryArtsModel.get({
      category_id: categoryId,
      active_competition: true,
    }),
  ])
}
