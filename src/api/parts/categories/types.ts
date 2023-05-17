import { PaginatedListProps, PaginatedListResponse } from '../../types'

export type CategoryResponse = {
  id: number
  name: string
  image: string | null
}

export type SpecificCategoryResponse = CategoryResponse & {
  description: string
  competition: {
    date_start: string
    date_end: string
  }
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
  art: {
    id: number
    image_thumbnail: string
  }
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
