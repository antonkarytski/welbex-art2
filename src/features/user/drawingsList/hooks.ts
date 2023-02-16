import { useCallback, useRef, useState } from 'react'
import { Profile, UserShort } from '../../../api/parts/users/types'
import { Drawing } from '../../drawing/types'
import { getUserDrawingsList } from '../request.drawingList'
import { UserDrawingListType } from '../types'

export function useDrawingsList(
  item: Profile | UserShort | null,
  type: UserDrawingListType
) {
  const [list, setList] = useState<Drawing[]>([])
  const nextPage = useRef<number | null>(0)

  const getFirstPage = useCallback(() => {
    if (!item) return
    getUserDrawingsList({ userId: item.id, page: 0, type }).then(
      ({ result, next }) => {
        nextPage.current = next
        setList(result ?? [])
      }
    )
  }, [item, type])

  const getNextPage = useCallback(() => {
    if (!item || nextPage.current === null) return
    getUserDrawingsList({ userId: item.id, page: nextPage.current, type }).then(
      ({ result, next }) => {
        nextPage.current = next
        if (result) setList((currentList) => [...currentList, ...result])
      }
    )
  }, [type, item])

  return [list, getFirstPage, getNextPage] as [
    Drawing[],
    () => void,
    () => void
  ]
}
