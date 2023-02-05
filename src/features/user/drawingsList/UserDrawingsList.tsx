import React, { ReactElement, useEffect } from 'react'
import { FlatListProps } from 'react-native'
import { links } from '../../../navigation/links'
import DrawingsList, { DrawingsListProps } from '../../drawing/DrawingsList'
import { Drawing } from '../../drawing/types'
import { User, UserDrawingListType } from '../types'
import { useDrawingsList } from './hooks'

type SpecificUserDrawingListProps = {
  item: User
}

type UserDrawingsListProps = Omit<
  FlatListProps<Drawing>,
  'renderItem' | 'data'
> & {
  type: UserDrawingListType
  navigationIndex?: number
  ListHeader?: ReactElement
  onScroll?: FlatListProps<any>['onScroll']
  StickyHeaderComponent?: FlatListProps<any>['StickyHeaderComponent']
} & SpecificUserDrawingListProps

const UserDrawingsList = ({
  item,
  type,
  navigationIndex,
  ...props
}: UserDrawingsListProps) => {
  const [list, getFirst, getNext] = useDrawingsList(item, type)

  useEffect(() => {
    getFirst()
  }, [getFirst])

  return (
    <DrawingsList
      {...props}
      onEndReach={getNext}
      data={list}
      navigationIndex={navigationIndex}
    />
  )
}

export default UserDrawingsList
