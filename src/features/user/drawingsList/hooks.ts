import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { UserDrawingListType, UserItem } from '../types'
import { UserArtsListsRequestModel } from './types'

export function useDrawingsList(
  item: UserItem | null,
  type: UserDrawingListType,
  model: UserArtsListsRequestModel['model']
) {
  const list = useStore(model[type].$items)
  const isLoading = useStore(model[type].$isLoading)
  const isNextLoading = useStore(model[type].$isNextLoading)

  const getFirst = useCallback(() => {
    if (!item) return
    model[type].get({ userId: item.id })
  }, [item, type, model])

  const getNext = useCallback(() => {
    if (!item) return
    model[type].getNext({ userId: item.id })
  }, [type, item, model])

  return { list, getFirst, getNext, isLoading, isNextLoading }
}
