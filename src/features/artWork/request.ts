import { attach, createEffect } from 'effector'
import { api } from '../../api'
import { ArtWorkGeneral } from '../../api/parts/arts/types'
import { downloadImageFromUrl } from '../../lib/files/download'
import { $isAuth } from '../auth/model'

export const toggleLike = (drawing: ArtWorkGeneral) => {
  const request = drawing.is_liked ? api.arts.dislikePost : api.arts.likePost
  return request(drawing.id)
}

export const toggleSave = (drawing: ArtWorkGeneral) => {
  const request = drawing.is_saved ? api.arts.unsavePost : api.arts.savePost
  return request(drawing.id)
}
type GetArtWorkEffectProps = {
  isAuth: boolean
  id: number
}

export const getArtWorkRequest = attach({
  source: $isAuth,
  mapParams: (id: number, isAuth) => ({ id, isAuth }),
  effect: createEffect(({ id, isAuth }: GetArtWorkEffectProps) => {
    if (isAuth) return api.arts.specificProtected(id)
    return api.arts.specific(id)
  }),
})

getArtWorkRequest.fail.watch((e) => {
  console.log(JSON.stringify(e))
})

export const downloadFullSizeDrawing = async (id: number) => {
  const request = await api.arts.downloadFullSizeDrawing.requestData(id)
  return downloadImageFromUrl(request.props.url, {
    headers: request.data.headers as Record<string, string>,
  })
}
