import { api } from '../../api'
import { createPaginationListModel } from '../../api/pagination/request'

export const WINNERS_PAGE_SIZE = 5

export const winnersRequest = createPaginationListModel({
  pageSize: WINNERS_PAGE_SIZE,
  request: api.categories.winners,
})
