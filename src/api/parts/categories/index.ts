import { apiManager } from '../../apiManager'
import { PaginatedListProps } from '../../types'
import {
  ArtWorksResponse,
  CategoriesResponse,
  CategoryArtWorksProps,
  SpecificCategoryResponse,
  WinnerResponse,
} from './types'

const categories = apiManager.endpoint('categories')
const all = categories.get<CategoriesResponse, PaginatedListProps | void>('all')
const winners = categories.get<WinnerResponse, PaginatedListProps | void>(
  'winners'
)
const specific = categories.get<SpecificCategoryResponse, number>()
const artWorks = categories.get<ArtWorksResponse, CategoryArtWorksProps>(
  ({ id, ...body }) => ({
    url: `${id}/arts/all`,
    body,
  })
)

export const categoriesApi = {
  all,
  specific,
  artWorks,
  winners,
}
