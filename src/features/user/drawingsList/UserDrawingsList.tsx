import React, { forwardRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Profile, UserShort } from '../../../api/parts/users/types'
import ArtWorksList, { ArtWorksFlatListProps } from '../../artWork/ArtWorksList'
import { UserDrawingListType } from '../types'
import { useDrawingsList } from './hooks'

type SpecificUserDrawingListProps = {
  item: Profile | UserShort | null
}

type UserDrawingsListProps = {
  type: UserDrawingListType
} & ArtWorksFlatListProps &
  SpecificUserDrawingListProps

const UserDrawingsList = forwardRef<FlatList, UserDrawingsListProps>(
  ({ item, type, ...props }, ref) => {
    const [list, getFirst, getNext] = useDrawingsList(item, type)

    useEffect(() => {
      getFirst()
    }, [getFirst])

    return (
      <ArtWorksList ref={ref} onEndReach={getNext} data={list} {...props} />
    )
  }
)

export default UserDrawingsList
