import { useStore } from 'effector-react'
import React, { forwardRef, useCallback } from 'react'
import { FlatList, LayoutChangeEvent, LogBox, StyleSheet } from 'react-native'
import { WINDOW_HEIGHT } from '../../../lib/device/dimensions'
import { MAIN_BOTTOM_TAB_BAR_HEIGHT } from '../../../screens/styles'
import { SCREEN_PADDING_HORIZONTAL } from '../../../styles/constants'
import DrawingsListSkeleton from '../../../ui/loaders/Skeleton.DrawingsList'
import DrawingsList, {
  ArtWorksFlatListProps,
} from '../../artWork/artWorksList/ArtWorksList'
import {
  DRAWINGS_COLUMNS_COUNT,
  DRAWING_ITEM_HEIGHT,
} from '../../artWork/artWorksList/constants'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { UserDrawingListType, UserItem } from '../types'
import UserDrawingsEmptyComponent from './UserDrawingsEmptyComponent'
import { useDrawingsList } from './hooks'
import { UserArtsListHeightModel, UserArtsListsRequestModel } from './types'

LogBox.ignoreLogs([
  "VirtualizedList: Encountered an error while measuring a list's offset",
])

type SpecificUserDrawingListProps = {
  item: UserItem | null
}

type UserDrawingsListProps = {
  type: UserDrawingListType
  artsListsRequestModel: UserArtsListsRequestModel['model']
  artsListsHeightModel: UserArtsListHeightModel
  listTopBlockHeight?: number
  isMyProfile?: boolean
} & Omit<ArtWorksFlatListProps, 'data'> &
  SpecificUserDrawingListProps

const UserDrawingsList = React.memo(
  forwardRef<FlatList, UserDrawingsListProps>(
    (
      {
        item,
        type,
        onLayout,
        artsListsRequestModel,
        artsListsHeightModel,
        listTopBlockHeight = 0,
        isMyProfile,
        ...props
      },
      ref
    ) => {
      const styles = useThemedStyle(themedStyles)
      const { list, isLoading } = useDrawingsList(
        item,
        type,
        artsListsRequestModel
      )

      const currentListType = useStore(artsListsHeightModel.$activeListTabKey)

      let artsListMinHeight =
        WINDOW_HEIGHT -
        listTopBlockHeight -
        (isMyProfile ? MAIN_BOTTOM_TAB_BAR_HEIGHT : 0)

      if (artsListMinHeight < 70) {
        artsListMinHeight = 70
      }

      const handleLayout = useCallback(
        (e: LayoutChangeEvent) => {
          if (isLoading) return
          if (currentListType !== type) return
          const rowsCount = list.length
            ? Math.ceil(list.length / DRAWINGS_COLUMNS_COUNT)
            : 0

          artsListsHeightModel.updateListsHeight({
            [type]: rowsCount
              ? rowsCount * DRAWING_ITEM_HEIGHT + 20
              : artsListMinHeight,
          })
          onLayout?.(e)
        },
        [onLayout, type, artsListsHeightModel, list, isLoading, currentListType]
      )

      const getItemLayout = useCallback(
        (data: any, index: number) => ({
          length: DRAWING_ITEM_HEIGHT,
          offset: DRAWING_ITEM_HEIGHT * index,
          index,
        }),
        []
      )

      return (
        <DrawingsList
          ref={ref}
          data={list}
          onLayout={handleLayout}
          listKey={type}
          containerStyle={styles.container}
          getItemLayout={getItemLayout}
          ListEmptyComponent={
            currentListType === type && !isLoading ? (
              <UserDrawingsEmptyComponent listType={currentListType} />
            ) : (
              DrawingsListSkeleton
            )
          }
          {...props}
        />
      )
    }
  )
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingTop: 24,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
      backgroundColor: colors.screenBackground,
    },
  })
)

export default UserDrawingsList
