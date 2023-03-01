import { api } from '../../api'
import { ArtWork } from '../../api/parts/arts/types'

export const toggleLike = (drawing: ArtWork) => {
  const request = drawing.is_liked ? api.arts.dislikePost : api.arts.likePost
  return request(drawing.id)
}

