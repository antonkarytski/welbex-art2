import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { api } from '../../api'
import { ArtWork } from '../../api/parts/arts/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { $isAuth } from '../auth/model'
import { galleryListsModel } from '../gallery/model'
import { toggleLikeRequest, toggleSaveRequest } from './request'

export const useAtrWorkActions = (
  itemData?: ArtWork | null,
  updateItemState?: (item: Partial<ArtWork>) => void
) => {
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)

  const preHandling = useCallback(
    (artData?: ArtWork | null) => {
      if (!isAuth) return navigate(links.login)
      return itemData || artData
    },
    [isAuth, itemData, navigate]
  )

  const updateGalleries = (data: Partial<ArtWork>) => {
    Object.values(galleryListsModel).forEach((model) => {
      model.updateItem(data)
    })
  }

  const toggleLike = useCallback(
    (artData?: ArtWork | null) => {
      const item = preHandling(artData)
      if (!item) return
      const likesCount = item.is_liked ? item.likes - 1 : item.likes + 1
      const newData = {
        id: item.id,
        is_liked: !item.is_liked,
        likes: likesCount,
      }
      toggleLikeRequest(item).then(() => {
        updateItemState?.(newData)
        updateGalleries(newData)
      })
    },
    [preHandling, updateItemState]
  )

  const like = (artData?: ArtWork | null) => {
    const item = preHandling(artData)
    if (!item) return
    if (!item.is_liked) {
      const newData = {
        id: item.id,
        is_liked: true,
        likes: item.likes + 1,
      }
      api.arts.likePost(item.id).then(() => {
        updateItemState?.(newData)
        updateGalleries(newData)
      })
    }
  }

  const save = (artData?: ArtWork | null) => {
    const item = preHandling(artData)
    if (!item) return
    const newData = { id: item.id, is_saved: !item.is_saved }
    toggleSaveRequest(item).then(() => {
      updateItemState?.(newData)
      updateGalleries(newData)
    })
  }

  const followAuthor = (isFollowed: boolean) => {
    const item = preHandling()
    if (!item) return
    const newData = {
      id: item.id,
      author: { ...item.author, is_followed: isFollowed },
    }
    updateItemState?.(newData)
    updateGalleries(newData)
  }

  return { toggleLike, save, like, followAuthor }
}
