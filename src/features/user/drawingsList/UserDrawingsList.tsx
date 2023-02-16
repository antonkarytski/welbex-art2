import React, { forwardRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Profile, UserShort } from '../../../api/parts/users/types'
import DrawingsList, { DrawingFlatListProps } from '../../drawing/DrawingsList'
import { UserDrawingListType } from '../types'
import { useDrawingsList } from './hooks'

type SpecificUserDrawingListProps = {
  item: Profile | UserShort | null
}

type UserDrawingsListProps = {
  type: UserDrawingListType
} & DrawingFlatListProps &
  SpecificUserDrawingListProps

const UserDrawingsList = forwardRef<FlatList, UserDrawingsListProps>(
  ({ item, type, ...props }, ref) => {
    const [list, getFirst, getNext] = useDrawingsList(item, type)

    useEffect(() => {
      getFirst()
    }, [getFirst])

    return (
      <DrawingsList ref={ref} onEndReach={getNext} data={list} {...props} />
    )
  }
)

export default UserDrawingsList
