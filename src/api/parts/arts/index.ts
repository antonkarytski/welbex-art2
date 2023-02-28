import { attach } from 'effector'
import { $isAuth } from '../../../features/auth/model'
import { apiManager } from '../../apiManager'
import {
  AllArtWorksProps,
  AllArtWorksResponse,
  ArtWork,
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
