import { Languages } from '../../../translations/types'
import { PaginatedListProps, PaginatedListResponse } from '../../types'
import { ArtPreview } from '../arts/types'

export enum CategoryStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}
export enum CategoryType {
  PREMIUM = 1,
  PUBLIC = 2,
}

export type CategoryResponse = {
  id: number
  name: string
  image: string | null
  type_id: CategoryType
  status_id: CategoryStatus
}

export type SpecificCategoryProps = {
  id: number
  language?: Languages
}

export type SpecificCategoryResponse = CategoryResponse & {
  description: string
  competition: {
    date_start: string
    date_end: string
  }
  status_id: CategoryStatus
  type_id: CategoryType
}

export type WinnerItem = {
  winner: {
    first_name: string
    last_name: string
    country: string
  }
  age_category: {
    min_age: number
    max_age: number
  }
  category: {
    name: string
  }
  art: ArtPreview
}

export type CategoriesResponse = PaginatedListResponse<CategoryResponse>
export type WinnerResponse = PaginatedListResponse<WinnerItem>

export type WinnerProps = {
  date_start?: string
  date_end?: string
} & PaginatedListProps

export type AvailableCategoriesResponse = {
  current_month: number[]
  next_month: number[]
}
