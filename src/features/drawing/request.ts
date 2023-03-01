import { useStore } from 'effector-react'
import { api } from '../../api'
import { createRequestModel } from '../../api/model.request'
import { ArtWork } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { $isAuth } from '../auth/model'

export const artWorkRequest = createRequestModel(api.arts.specific)

export const toggleLike = (drawing: ArtWork) => {
  const request = drawing.is_liked ? api.arts.dislikePost : api.arts.likePost
  return request(drawing.id)
}

export const likeDrawing = api.arts.likePost
export const dislikeDrawing = api.arts.dislikePost

export const useLikeDrawingRequest = (drawing: ArtWork) => {
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const onLikeDrawing = () => {
    if (!isAuth) return navigate(links.login)
    toggleLike(drawing).then(() => {
      artWorkRequest.update({ is_liked: !drawing.is_liked })
    })
  }

  return onLikeDrawing
}
