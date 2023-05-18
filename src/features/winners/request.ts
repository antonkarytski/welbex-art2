import { attach } from 'effector'
import { api } from '../../api'
import { PaginatedListProps } from '../../api/types'
import { createPaginationListModel } from '../../lib/models/pagination'
import { languageModel } from '../../translations/model.languages'

export const WINNERS_PAGE_SIZE = 10

export const getLocalizedCurrentMonthWinners = attach({
  source: languageModel.$state,
  mapParams: (params: PaginatedListProps | void, language) => ({
    language,
    ...params,
  }),
  effect: api.categories.currentMonthWinners,
})
export const winnersListModel = createPaginationListModel({
  pageSize: WINNERS_PAGE_SIZE,
  request: getLocalizedCurrentMonthWinners,
})
