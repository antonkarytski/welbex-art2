import { api } from '../../../api'
import { createPaginationListModel } from '../../../api/pagination/request'

const CATEGORIES_PAGE_SIZE = 5

export const categoriesRequest = createPaginationListModel({
  pageSize: CATEGORIES_PAGE_SIZE,
  apiRequest: api.categories.all,
})
