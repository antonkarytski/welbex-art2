import { ImageFile } from '../../../lib/files/types'
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
export type CountOfFilteredArtsResponse = {
  total: number
}

export type ArtWorkCreateResponse = {
  id: number
  title: string
  image_thumbnail: string
  author: {
    id: number
    first_name: string
    last_name: string
    country: string
    avatar: string
    age: number
  }
}

export type ArtWorkCreateProps = {
  image: ImageFile
  childDocument: ImageFile
  title: string
  categoryId: number
}
