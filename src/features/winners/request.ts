import { api } from '../../api'
import { createPaginationListModel } from '../../lib/models/pagination'

export const WINNERS_PAGE_SIZE = 5

export const winnersListModel = createPaginationListModel({
  pageSize: WINNERS_PAGE_SIZE,
  request: api.categories.winners,
})
