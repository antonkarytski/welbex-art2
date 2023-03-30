import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { UserDrawingListType, UserItem } from '../types'
import { UserArtsListsRequestModel } from './types'

export function useDrawingsList(
  item: UserItem | null,
  type: UserDrawingListType,
  model: UserArtsListsRequestModel['model']
) {
  const userId = item?.id
  const list = useStore(model[type].$items)
  const isLoading = useStore(model[type].$isLoading)
  const isNextLoading = useStore(model[type].$isNextLoading)
  const isRefreshing = useStore(model[type].$isRefreshing)

  const getFirst = useCallback(() => {
    if (!userId) return
    model[type].get({ userId })
  }, [userId, type, model])

  const refresh = useCallback(() => {
    if (!userId) return
    model[type].refreshSync({ userId })
  }, [userId, type, model])

  const getNext = useCallback(() => {
    if (!userId) return
    model[type].getNext({ userId })
  }, [type, userId, model])

  return {
    list,
    getFirst,
    getNext,
    isLoading,
    isNextLoading,
    refresh,
    isRefreshing,
  }
}
