import { api } from '../../api'
import { createPaginationListModel } from '../../lib/models/pagination'
import { withLanguageModel } from '../../translations/model.languages'

export const WINNERS_PAGE_SIZE = 10

export const getLocalizedCurrentMonthWinners = withLanguageModel(
  api.categories.currentMonthWinners
)

export const winnersListModel = createPaginationListModel({
  pageSize: WINNERS_PAGE_SIZE,
  request: getLocalizedCurrentMonthWinners,
})
