import React, { useEffect } from 'react'
import { noop } from '../../../lib/helpers'
import DrawingsList from '../../drawing/DrawingsList'
import { User, UserDrawingListType } from '../types'
import { useDrawingsList } from './hooks'

type SpecificUserDrawingListProps = {
  item: User
}

type UserDrawingsListProps = {
  type: UserDrawingListType
} & SpecificUserDrawingListProps

const UserDrawingsList = ({ item, type }: UserDrawingsListProps) => {
  const [list, getFirst, getNext] = useDrawingsList(item, type)

  useEffect(() => {
    getFirst().catch(noop)
  }, [getFirst])

  return <DrawingsList onEndReach={getNext} data={list} />
}

export default UserDrawingsList
