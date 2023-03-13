import { useStore } from 'effector-react'
import { useCallback, useState } from 'react'
import { UserDrawingListType, UserItem } from '../types'
import { UserArtsListsRequestModel } from './types'

type GetProps = { onFinally?: () => void }
type GetFirstProps = GetProps & { refreshing?: boolean }

export function useDrawingsList(
  item: UserItem | null,
  type: UserDrawingListType,
  model: UserArtsListsRequestModel['model']
) {
  const list = useStore(model[type].$items)
  const isLoading = useStore(model[type].$isLoading)
  const isNextLoading = useStore(model[type].$isNextLoading)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getFirst = useCallback(
    (props?: GetFirstProps) => {
      if (!item) return
      if (props?.refreshing) {
        setIsRefreshing(true)
      }
      model[type].get({ userId: item.id }).finally(() => {
        if (props?.refreshing) {
          setIsRefreshing(false)
        }
        props?.onFinally?.()
      })
    },
    [item, type, model]
  )

  const getNext = useCallback(
    (props?: GetProps) => {
      if (!item) return
      model[type].getNext({ userId: item.id }).finally(() => {
        props?.onFinally?.()
      })
    },
    [type, item, model]
  )

  return { list, getFirst, getNext, isLoading, isNextLoading, isRefreshing }
}
