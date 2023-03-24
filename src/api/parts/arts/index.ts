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
const best = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>('best')
const bestProtected = best.protect()
const newArts = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>('new')
const newArtsProtected = newArts.protect()
const following = allArts
  .get<AllArtWorksResponse, AllArtWorksProps | void>('following')
  .protect()

const specificProtected = arts.get<ArtWork, number>()
const specific = arts.get<ArtWorkGeneral, number>().unprotect()
const likePost = arts.put<ArtWork, number>((id) => `${id}/like`)
const dislikePost = arts.put<ArtWork, number>((id) => `${id}/remove-like`)
const savePost = arts.put<ArtWork, number>((id) => `${id}/save`)
const unsavePost = arts.put<ArtWork, number>((id) => `${id}/unsave`)
export const downloadFullSizeDrawing = arts.get<ArtWork, number>(
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
    fn: ({ categoryId, ...rest }) => ({
      body: formDataFromList({ ...rest, category_id: categoryId }),
    }),
  })
  .withProgress()

const userArts = arts.endpoint('user').unprotect()
const userAllArts = userArts.get<ArtsListPreviewResponse, ArtsListProps>(
  ({ userId, ...rest }) => ({ url: `${userId}/all`, body: rest })
)
const userLikedArts = userArts.get<ArtsListPreviewResponse, ArtsListProps>(
  ({ userId, ...rest }) => ({ url: `${userId}/liked`, body: rest })
)
const userSavedArts = userArts.get<ArtsListPreviewResponse, ArtsListProps>(
  ({ userId, ...rest }) => ({ url: `${userId}/saved`, body: rest })
)

export const artsApi = {
  all,
  best,
  bestProtected,
  following,
  newArts,
  newArtsProtected,
  specific,
  specificProtected,
  countOfFiltered,
  likePost,
  dislikePost,
  savePost,
  unsavePost,
  downloadFullSizeDrawing,
  create,
  userAllArts,
  userLikedArts,
  userSavedArts,
}
