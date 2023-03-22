import { createEvent, restore } from 'effector'
import { api } from '../../../api'
import { ARTS_PAGE_SIZE } from '../../../api/constants'
import { createRequestModel } from '../../../api/model.request'
import { createPaginationListModel } from '../../../lib/models/pagination'

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
