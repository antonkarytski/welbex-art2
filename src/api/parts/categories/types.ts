import { PaginatedListProps, PaginatedListResponse } from '../../types'

export type CategoryResponse = {
  id: number
  name: string
  image: string
}

export type SpecificCategoryResponse = CategoryResponse & {
  description: string
}

export type CategoryArtWorksProps = PaginatedListProps & {
  id: number
}

export type ArtWorkPreviewResponse = {
  id: number
  image: string
}

type WinnerItem = {
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
    image: string
  }
}

export type CategoriesResponse = PaginatedListResponse<CategoryResponse>
export type ArtWorksResponse = PaginatedListResponse<ArtWorkPreviewResponse>
export type WinnerResponse = PaginatedListResponse<WinnerItem>
