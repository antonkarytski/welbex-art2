import { api } from '../../api'
import { createPaginationListModel } from '../../api/pagination'

export const WINNERS_PAGE_SIZE = 5

export const winnersListModel = createPaginationListModel({
  pageSize: WINNERS_PAGE_SIZE,
  request: api.categories.winners,
})
