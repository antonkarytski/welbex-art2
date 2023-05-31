import moment from 'moment'
import { STANDARD_DATE_FORMAT } from '../../../lib/helpers/date'
import { apiManager } from '../../apiManager'
import { LocalizedPaginatedListProps, PaginatedListProps } from '../../types'
import {
  AvailableCategoriesResponse,
  CategoriesResponse,
  SpecificCategoryProps,
  SpecificCategoryResponse,
  WinnerProps,
  WinnerResponse,
} from './types'

const categories = apiManager.endpoint('categories')
const all = categories.get<
  CategoriesResponse,
  LocalizedPaginatedListProps | void
>('all')

const winners = categories.get<WinnerResponse, WinnerProps | void>('winners')
const currentMonthWinners = categories.get<
  WinnerResponse,
  LocalizedPaginatedListProps | void
>({
  fn: (params) => {
    const date_start = moment().startOf('month').format(STANDARD_DATE_FORMAT)
    const date_end = moment().endOf('month').format(STANDARD_DATE_FORMAT)
    return { url: 'winners', body: { ...params, date_start, date_end } }
  },
})

const specific = categories.get<
  SpecificCategoryResponse,
  SpecificCategoryProps
>({
  fn: ({ id, ...params }) => ({
    url: `${id}`,
    body: params,
  }),
})

const getAvailable = categories
  .get<AvailableCategoriesResponse, void>('get-available-categories-ids')
  .protect()

export const categoriesApi = {
  all,
  specific,
  winners,
  currentMonthWinners,
  getAvailable,
}
