import { api } from '../../api'
import { createPaginationListModel } from '../../api/pagination/request'

export const WINNERS_PAGE_SIZE = 10

export const {
  $nextPage,
  getItems: getWinners,
  getNextItems: getNextWinners,
  $items: $winners,
  $isLoading,
} = createPaginationListModel({
  pageSize: WINNERS_PAGE_SIZE,
  apiRequest: api.categories.winners,
})
