import { attach } from 'effector'
import { $isAuth } from '../../../features/auth/model'
import { getMime } from '../../../lib/files/mimeType'
import { ContentType } from '../../../lib/models/apiBuilder/types'
import { apiManager } from '../../apiManager'
import {
  AllArtWorksProps,
  AllArtWorksResponse,
  ArtWork,
  ArtWorkCreateProps,
  ArtWorkCreateResponse,
  ArtWorksFilterProps,
  CountOfFilteredArtsResponse,
} from './types'

const arts = apiManager.endpoint('arts').protect()
const all = arts.get<AllArtWorksResponse, AllArtWorksProps | void>({
  endpoint: 'all',
  withToken: false,
})

const getSpecificArt = arts.get<ArtWork, { id: number; isAuth: boolean }>(
  ({ id, isAuth }) => ({
    entityId: id,
    withToken: isAuth ? true : false,
  })
)

const specific = attach({
  source: $isAuth,
  mapParams: (id: number, isAuth: boolean) => ({ id, isAuth }),
  effect: getSpecificArt,
})

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
  fn: (props) => {
    const formData = new FormData()
    formData.append('image', {
      ...props.image,
      type: getMime(props.image.uri),
    } as any as Blob)
    formData.append('child_identity_document', {
      ...props.childDocument,
      type: getMime(props.childDocument.uri),
    } as any as Blob)
    formData.append('title', props.title)
    formData.append('category_id', props.categoryId.toString())
    return {
      body: formData,
    }
  },
})

export const artsApi = {
  all,
  specific,
  countOfFiltered,
  likePost,
  dislikePost,
  savePost,
  unsavePost,
  downloadThumbnailDrawing,
  downloadFullsizeDrawing,
}
