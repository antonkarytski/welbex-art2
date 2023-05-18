import { createPaginationListModel } from '../../lib/models/pagination'
import { getLocalizedCategories } from './request'

const CATEGORIES_PAGE_SIZE = 5

export const categoriesListModel = createPaginationListModel({
  pageSize: CATEGORIES_PAGE_SIZE,
  request: getLocalizedCategories,
})
