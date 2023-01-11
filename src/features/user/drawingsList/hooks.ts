import { useCallback, useRef, useState } from 'react'
import { Drawing } from '../../drawing/types'
import {
  GetUserDrawingsListRequestResult,
  getUserDrawingsList,
} from '../request.drawingList'
import { User, UserDrawingListType } from '../types'

type DrawingsListGetter = () => Promise<GetUserDrawingsListRequestResult>

export function useDrawingsList(item: User, type: UserDrawingListType) {
  const [list, setList] = useState<Drawing[]>([])
  const nextPage = useRef<number | null>(0)

  const getFirstPage = useCallback(() => {
    getUserDrawingsList({ userId: item.id, page: 0, type }).then(
      ({ result, next }) => {
        nextPage.current = next
        setList(result ?? [])
      }
    )
  }, [item, type])

  const getNextPage = useCallback(() => {
    if (nextPage.current === null) return
    getUserDrawingsList({ userId: item.id, page: nextPage.current, type }).then(
      ({ result, next }) => {
        nextPage.current = next
        if (result) setList((currentList) => [...currentList, ...result])
      }
    )
  }, [type, item])

  return [list, getFirstPage, getNextPage] as [
    Drawing[],
    DrawingsListGetter,
    DrawingsListGetter
  ]
}
