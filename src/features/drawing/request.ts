import { useStore } from 'effector-react'
import { api } from '../../api'
import { createRequestModel } from '../../api/model.request'
import { ArtWork } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { $isAuth } from '../auth/model'

export const specificArtWorkModel = createRequestModel(
  api.arts.specificProtected
)

export const likeDrawing = api.arts.likePost
export const dislikeDrawing = api.arts.dislikePost
export const saveDrawing = api.arts.savePost
export const unsaveDrawing = api.arts.unsavePost
export const downloadThumbnailDrawing = api.arts.downloadThumbnailDrawing
export const downloadFullsizeDrawing = api.arts.downloadFullsizeDrawing

export const useLikeDrawingRequest = (drawing: ArtWork) => {
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const onLikeDrawing = () => {
    if (!isAuth) return navigate(links.login)
    if (drawing.is_liked) {
      dislikeDrawing(drawing.id).then(() =>
        specificArtWorkModel.update({ is_liked: false })
      )
      return
    }
    likeDrawing(drawing.id).then(() =>
      specificArtWorkModel.update({ is_liked: true })
    )
  }

  return onLikeDrawing
}
