import { PaginatedListProps, PaginatedListResponse } from '../../types'
import { UserShort } from '../users/types'

export type ArtWorksFilterProps = {
  category_id?: number
  title?: string
  country?: string
  min_age?: number
  max_age?: number
}

export type AllArtWorksProps = ArtWorksFilterProps & PaginatedListProps

export type ArtWorkWhileUnauthourized = {
  id: number
  title: string
  competition_id: number
  image_thumbnail: string
  author: UserShort
  likes: number
}

export type ArtWork = ArtWorkWhileUnauthourized & {
  is_liked: boolean
  is_saved: boolean
}

export type AllArtWorksResponse = PaginatedListResponse<ArtWork>
export type CountOfFilteredArtsResponse = {
  total: number
}
