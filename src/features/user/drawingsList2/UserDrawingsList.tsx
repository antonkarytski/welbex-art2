import React, { forwardRef, useEffect } from 'react'
import { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native'
import DrawingsList, { DrawingFlatListProps } from '../../drawing/DrawingsList'
import { User, UserDrawingListType } from '../types'
import { useDrawingsList } from './hooks'

type SpecificUserDrawingListProps = {
  item: User
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
