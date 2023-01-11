import React, { useCallback, useEffect, useRef, useState } from 'react'
import DrawingsList from '../drawing/DrawingsList'
import { Drawing } from '../drawing/types'
import { getUserDrawingsList } from './request.drawingList'
import { User, UserDrawingListType } from './types'

type SpecificUserDrawingListProps = {
  item: User
}

type UserDrawingsListProps = {
  type: UserDrawingListType
} & SpecificUserDrawingListProps

const UserDrawingsList = ({ item, type }: UserDrawingsListProps) => {
  const [list, setList] = useState<Drawing[]>([])
  const nextPage = useRef<number | null>(0)

  const getNextPage = useCallback(() => {
    if (nextPage.current === null) return
    getUserDrawingsList({ userId: item.id, page: nextPage.current, type }).then(
      ({ result, next }) => {
        if (result) setList((currentList) => [...currentList, ...result])
        nextPage.current = next
      }
    )
  }, [type, item])

  const getFirstPage = useCallback(() => {
    getUserDrawingsList({ userId: item.id, page: 0, type }).then(
      ({ result, next }) => {
        nextPage.current = next
        setList(result ?? [])
      }
    )
  }, [item, type])

  useEffect(() => {
    getFirstPage()
  }, [getFirstPage])

  return <DrawingsList onEndReach={getNextPage} data={list} />
}

export default UserDrawingsList
