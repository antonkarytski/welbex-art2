import { createEvent, restore } from 'effector'
import { api } from '../../../api'
import { createRequestModel } from '../../../api/model.request'
import {
  ARTS_PAGE_SIZE,
  createPaginationListModel,
} from '../../../api/pagination'

export const categoryDetailsModel = createRequestModel(api.categories.specific)

export const categoryArtsModel = createPaginationListModel({
  pageSize: ARTS_PAGE_SIZE,
  request: api.arts.all,
  staticProps: { active_competition: true },
})

export const setCategoryArtsSearchString = createEvent<string>()
export const resetCategoryArtsSearchString = createEvent()
export const $categoryArtsSearchString = restore(
  setCategoryArtsSearchString,
  ''
).reset(resetCategoryArtsSearchString)

export const setCategoryId = createEvent<number>()
export const $categoryId = restore(setCategoryId, null)
