import { api } from '../../api'
import { createPaginationListModel } from '../../api/pagination'

const CATEGORIES_PAGE_SIZE = 5

export const categoriesListModel = createPaginationListModel({
  pageSize: CATEGORIES_PAGE_SIZE,
  request: api.categories.all,
})
