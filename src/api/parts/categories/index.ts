import { apiManager } from '../../apiManager'
import { PaginatedListProps } from '../../types'
import {
  CategoriesResponse,
  SpecificCategoryResponse,
  WinnerResponse,
} from './types'

const categories = apiManager.endpoint('categories')
const all = categories.get<CategoriesResponse, PaginatedListProps | void>('all')
const winners = categories.get<WinnerResponse, PaginatedListProps | void>(
  'winners'
)
const specific = categories.get<SpecificCategoryResponse, number>()

export const categoriesApi = {
  all,
  specific,
  winners,
}
