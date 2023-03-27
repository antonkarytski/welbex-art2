import { Effect } from 'effector'
import { useStore } from 'effector-react'
import { api } from '../../api'
import { ArtWorkGeneral } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { $isAuth } from '../auth/model'
import { toggleLike, toggleSave } from './request'

export const useArtWorkActions = (
  itemData: ArtWorkGeneral | null,
  updateItemState:
    | ((props: Partial<ArtWorkGeneral>) => void)
    | Effect<any, any, Error>
) => {
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)

  const onPreHandling = (artData?: ArtWorkGeneral | null) => {
    if (!isAuth) return navigate(links.login)
    return itemData || artData
  }

  const onToggleLike = (artData?: ArtWorkGeneral | null) => {
    const item = onPreHandling(artData)
    if (!item) return
    const likesCount = item.is_liked ? item.likes - 1 : item.likes + 1
    toggleLike(item).then(() => {
      updateItemState({
        id: item.id,
        is_liked: !item.is_liked,
        likes: likesCount,
      })
    })
  }

  const onLike = (artData?: ArtWorkGeneral | null) => {
    const item = onPreHandling(artData)
    if (!item) return
    if (!item.is_liked) {
      api.arts.likePost(item.id).then(() => {
        updateItemState({ id: item.id, is_liked: true, likes: item.likes + 1 })
      })
    }
  }

  const onSave = (artData?: ArtWorkGeneral | null) => {
    const item = onPreHandling(artData)
    if (!item) return
    toggleSave(item).then(() => {
      updateItemState({ id: item.id, is_saved: !item.is_saved })
    })
  }

  const onFollowAuthor = (isFollowed: boolean) => {
    const item = onPreHandling()
    if (!item) return

    updateItemState({
      id: item.id,
      author: { ...item.author, is_followed: isFollowed },
    })
  }

  return { onToggleLike, onSave, onLike, onFollowAuthor }
}
