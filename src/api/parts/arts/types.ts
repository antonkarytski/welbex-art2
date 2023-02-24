import { PaginatedListProps, PaginatedListResponse } from '../../types'
import { UserShort } from '../users/types'

export type AllArtWorksProps = {
  category_id?: number
  title?: string
  country?: string
  min_age?: number
  max_age?: number
} & PaginatedListProps

export type ArtWork = {
  id: number
  title: string
  competition_id: number
  image_thumbnail: string
  author: UserShort
  likes: number
  is_liked: boolean
}

export type AllArtWorksResponse = PaginatedListResponse<ArtWork>
