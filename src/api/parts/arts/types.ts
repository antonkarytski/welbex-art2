import { PaginatedListProps, PaginatedListResponse } from '../../types'

export type AllArtWorksProps = {
  category_id?: number
  title?: string
  country?: string
  min_age?: number
  max_age?: number
} & PaginatedListProps

type ArtWork = {
  id: number
  title: string
  competition_id: number
  image: string
  author: {
    is_followed: boolean
    id: number
    first_name: string
    last_name: string
    country: string
    avatar: string
    age: number
  }
  likes: number
  is_liked: boolean
}

export type AllArtWorksResponse = PaginatedListResponse<ArtWork>
