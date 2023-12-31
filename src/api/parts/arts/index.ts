import { ContentType } from '@heyheyjude/toolkit'
import { formDataFromList } from '../../../lib/files/formData'
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
const artOfTheDay = arts.get<ArtWork | null>('art-of-the-day').unprotect()
const specific = arts.get<ArtWorkGeneral, number>().unprotect()
const likePost = arts.put<ArtWork, number>((id) => `${id}/like`)
const dislikePost = arts.put<ArtWork, number>((id) => `${id}/remove-like`)
const savePost = arts.put<ArtWork, number>((id) => `${id}/save`)
const unsavePost = arts.put<ArtWork, number>((id) => `${id}/unsave`)
export const downloadFullSizeDrawing = arts.get<ArtWork, number>(
  (id) => `${id}/download-full-size-image`
)

const countOfFilteredProtected = arts.get<
  CountOfFilteredArtsResponse,
  ArtWorksFilterProps
>('total')
const countOfFiltered = countOfFilteredProtected.unprotect()

const create = arts
  .post<ArtWorkCreateResponse, ArtWorkCreateProps>({
    endpoint: 'create',
    contentType: ContentType.FORM_DATA,
    fn: (data) => ({
      body: formDataFromList(data),
    }),
  })
  .withProgress()

const userArts = arts.endpoint('user').unprotect()
function createUserArtsRequest(endpoint: string) {
  return userArts.get<ArtsListPreviewResponse, ArtsListProps>(
    ({ userId, ...rest }) => ({ url: `${userId}/${endpoint}`, body: rest })
  )
}
const userAllArts = createUserArtsRequest('all')
const userAllArtsProtected = userAllArts.protect()
const userLikedArts = createUserArtsRequest('liked')
const userSavedArts = createUserArtsRequest('saved')

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
  countOfFilteredProtected,
  likePost,
  dislikePost,
  savePost,
  unsavePost,
  downloadFullSizeDrawing,
  create,
  userAllArts,
  userAllArtsProtected,
  userLikedArts,
  userSavedArts,
  artOfTheDay,
}
