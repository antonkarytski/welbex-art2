import { formDataFromList } from '../../../lib/files/formData'
import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import {
  AllArtWorksProps,
  AllArtWorksResponse,
  ArtWork,
  ArtWorkCreateProps,
  ArtWorkCreateResponse,
  ArtWorkWhileUnauthorized,
  ArtWorksFilterProps,
  ArtsListPreviewResponse,
  ArtsListProps,
  CountOfFilteredArtsResponse,
} from './types'

const arts = apiManager.endpoint('arts').protect()

const all = arts.get<AllArtWorksResponse, AllArtWorksProps | void>({
  endpoint: 'all',
  withToken: false,
})

const best = arts.get<AllArtWorksResponse, AllArtWorksProps | void>({
  endpoint: 'all/best',
  withToken: false,
})

const newArts = arts.get<AllArtWorksResponse, AllArtWorksProps | void>({
  endpoint: 'all/new',
  withToken: false,
})

const following = arts.get<AllArtWorksResponse, AllArtWorksProps | void>(
  'all/following'
)

const specific = arts.get<ArtWorkWhileUnauthorized, number>((id) => ({
  entityId: id,
  withToken: false,
}))

const specificProtected = arts.get<ArtWork, number>()

const likePost = arts.put<ArtWork, any>((id) => `${id}/like`)
const dislikePost = arts.put<ArtWork, number>((id) => `${id}/remove-like`)
const savePost = arts.put<ArtWork, number>((id) => `${id}/save`)
const unsavePost = arts.put<ArtWork, number>((id) => `${id}/unsave`)
const downloadThumbnailDrawing = arts.get<ArtWork, number>(
  (id) => `${id}/download-thumbnail-image`
)
const downloadFullsizeDrawing = arts.get<ArtWork, number>(
  (id) => `${id}/download-full-size-image`
)

const countOfFiltered = arts.get<
  CountOfFilteredArtsResponse,
  ArtWorksFilterProps
>('total')

const create = arts.post<ArtWorkCreateResponse, ArtWorkCreateProps>({
  endpoint: 'create',
  contentType: ContentType.FORM_DATA,
  fn: ({ image, childDocument, title, categoryId }) => {
    return {
      body: formDataFromList({
        image,
        title,
        child_identity_document: childDocument,
        category_id: categoryId,
      }),
    }
  },
})

const userArts = arts.endpoint('user')

const userAllArts = userArts.get<ArtsListPreviewResponse, ArtsListProps>(
  ({ userId, ...rest }) => ({ entityId: `${userId}/all`, body: rest })
)

const userLikedArts = userArts.get<ArtsListPreviewResponse, ArtsListProps>(
  ({ userId, ...rest }) => ({ entityId: `${userId}/liked`, body: rest })
)
const userSavedArts = userArts.get<ArtsListPreviewResponse, ArtsListProps>(
  ({ userId, ...rest }) => ({ entityId: `${userId}/saved`, body: rest })
)

export const artsApi = {
  all,
  best,
  following,
  newArts,
  specific,
  specificProtected,
  countOfFiltered,
  likePost,
  dislikePost,
  savePost,
  unsavePost,
  downloadThumbnailDrawing,
  downloadFullsizeDrawing,
  create,
  userAllArts,
  userLikedArts,
  userSavedArts,
}
