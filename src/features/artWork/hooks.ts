import { Effect } from 'effector'
import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { api } from '../../api'
import { ArtWorkGeneral } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { $isAuth } from '../auth/model'
import { toggleLikeRequest, toggleSaveRequest } from './request'

export const useAtrWorkActions = (
  itemData: ArtWorkGeneral | null,
  updateItemState:
    | ((props: Partial<ArtWorkGeneral>) => void)
    | Effect<any, any, Error>
) => {
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)

  const preHandling = useCallback(
    (artData?: ArtWorkGeneral | null) => {
      if (!isAuth) return navigate(links.login)
      return itemData || artData
    },
    [isAuth, itemData, navigate]
  )

  const toggleLike = useCallback(
    (artData?: ArtWorkGeneral | null) => {
      const item = preHandling(artData)
      if (!item) return
      const likesCount = item.is_liked ? item.likes - 1 : item.likes + 1
      toggleLikeRequest(item).then(() => {
        updateItemState({
          id: item.id,
          is_liked: !item.is_liked,
          likes: likesCount,
        })
      })
    },
    [preHandling, updateItemState]
  )

  const like = (artData?: ArtWorkGeneral | null) => {
    const item = preHandling(artData)
    if (!item) return
    if (!item.is_liked) {
      api.arts.likePost(item.id).then(() => {
        updateItemState({ id: item.id, is_liked: true, likes: item.likes + 1 })
      })
    }
  }

  const save = (artData?: ArtWorkGeneral | null) => {
    const item = preHandling(artData)
    if (!item) return
    toggleSaveRequest(item).then(() => {
      updateItemState({ id: item.id, is_saved: !item.is_saved })
    })
  }

  const followAuthor = (isFollowed: boolean) => {
    const item = preHandling()
    if (!item) return

    updateItemState({
      id: item.id,
      author: { ...item.author, is_followed: isFollowed },
    })
  }

  return { toggleLike, save, like, followAuthor }
}
