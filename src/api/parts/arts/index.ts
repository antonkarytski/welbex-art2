import { formDataFromList } from '../../../lib/files/formData'
import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import {
  AllArtWorksProps,
  AllArtWorksResponse,
  ArtWork,
  ArtWorkCreateProps,
  ArtWorkCreateResponse,
  ArtWorkGeneral,
  ArtWorksFilterProps,
  ArtsListPreviewResponse,
  ArtsListProps,
  CountOfFilteredArtsResponse,
} from './types'

const arts = apiManager.endpoint('arts').protect()
const allArts = arts.endpoint('all').unprotect()

const all = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>()

// TODO: временно, нужны правки на бэке
// const best = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>('best')
// const newArts = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>('new')

const best = arts.get<AllArtWorksResponse, AllArtWorksProps | void>('all/best')
const newArts = arts.get<AllArtWorksResponse, AllArtWorksProps | void>(
  'all/new'
)

const following = arts.get<AllArtWorksResponse, AllArtWorksProps | void>(
  'all/following'
)

const specific = arts.get<ArtWorkGeneral, number>({ withToken: false })
const specificProtected = arts.get<ArtWork, number>()
const likePost = arts.put<ArtWork, number>((id) => `${id}/like`)
const dislikePost = arts.put<ArtWork, number>((id) => `${id}/remove-like`)
const savePost = arts.put<ArtWork, number>((id) => `${id}/save`)
const unsavePost = arts.put<ArtWork, number>((id) => `${id}/unsave`)
const downloadThumbnailDrawing = arts.get<ArtWork, number>(
  (id) => `${id}/download-thumbnail-image`
)
const downloadFullSizeDrawing = arts.get<ArtWork, number>(
  (id) => `${id}/download-full-size-image`
)
const countOfFiltered = arts.get<
  CountOfFilteredArtsResponse,
  ArtWorksFilterProps
>('total')
const create = arts
  .post<ArtWorkCreateResponse, ArtWorkCreateProps>({
    endpoint: 'create',
    contentType: ContentType.FORM_DATA,
    fn: ({ image, title, categoryId }) => ({
      body: formDataFromList({
        image,
        title,
        category_id: categoryId,
      }),
    }),
  })
  .withProgress()

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
  downloadFullSizeDrawing,
  create,
  userAllArts,
  userLikedArts,
  userSavedArts,
}
