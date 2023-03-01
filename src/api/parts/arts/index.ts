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
  CountOfFilteredArtsResponse,
} from './types'

const arts = apiManager.endpoint('arts').protect()
const allArts = arts.endpoint('all').unprotect()
const all = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>()
const best = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>('best')
const newArts = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>('new')
const following = allArts.get<AllArtWorksResponse, AllArtWorksProps | void>(
  'following'
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
const downloadFullsizeDrawing = arts.get<ArtWork, number>(
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
  .withProgress()

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
}
