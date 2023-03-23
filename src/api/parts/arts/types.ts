import { ImageFile } from '../../../lib/files/types'
import { PaginatedListProps, PaginatedListResponse } from '../../types'
import { UserShort } from '../users/types'

export type ArtWorksFilterProps = {
  category_ids?: number
  active_competition?: boolean
  title?: string
  countries?: string
  min_age?: number
  max_age?: number
}

export type AllArtWorksProps = ArtWorksFilterProps & PaginatedListProps

export type ArtWorkGeneral = {
  id: number
  title: string
  competition_id: number
  competition: {
    category: {
      name: string
    }
  }
  image_thumbnail: string
  author: UserShort
  likes: number
  //for typing compatibility
  is_liked?: boolean
  is_saved?: boolean
}

export type ArtWork = ArtWorkGeneral & {
  is_liked: boolean
  is_saved: boolean
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
  title: string
  categoryId: number
}

export type ArtPreview = {
  id: number
  image_thumbnail: string
}

export type ArtsListPreviewResponse = PaginatedListResponse<ArtPreview>

export type ArtsListProps = PaginatedListProps & { userId: number }
