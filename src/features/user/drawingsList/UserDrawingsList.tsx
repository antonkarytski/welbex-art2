import React, { forwardRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Profile, UserShort } from '../../../api/parts/users/types'
import ArtWorksList, { ArtWorksFlatListProps } from '../../artWork/ArtWorksList'
import { UserDrawingListType } from '../types'
import { useStore } from 'effector-react'
import React, { forwardRef, useCallback, useEffect } from 'react'
import {
  FlatList,
  LayoutChangeEvent,
  LogBox,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native'
import {
  SCREEN_CONTENT_WIDTH,
  SCREEN_PADDING_HORIZONTAL,
} from '../../../styles/constants'
import DrawingsListSkeleton from '../../../ui/loaders/Skeleton.DrawingsList'
import DrawingsList, {
  DRAWINGS_COLUMNS_COUNT,
  DRAWING_ITEM_MARGIN,
  DrawingFlatListProps,
} from '../../drawing/DrawingsList'
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
} & ArtWorksFlatListProps &
  artsListsRequestModel: UserArtsListsRequestModel['model']
  artsListsHeightModel: UserArtsListHeightModel
} & DrawingFlatListProps &
  SpecificUserDrawingListProps

const DRAWING_ITEM_HEIGHT =
  SCREEN_CONTENT_WIDTH / DRAWINGS_COLUMNS_COUNT + DRAWING_ITEM_MARGIN / 2

const UserDrawingsList = React.memo(
  forwardRef<FlatList, UserDrawingsListProps>(
    (
      {
        item,
        type,
        onLayout,
        artsListsRequestModel,
        artsListsHeightModel,
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

      const handleLayout = useCallback(
        (e: LayoutChangeEvent) => {
          if (isLoading) return

          const rowsCount = list.length
            ? Math.ceil(list.length / DRAWINGS_COLUMNS_COUNT)
            : 0

          artsListsHeightModel.updateListsHeight({
            [type]: rowsCount * DRAWING_ITEM_HEIGHT + 20,
          })
          onLayout?.(e)
        },
        [onLayout, type, artsListsHeightModel, list, isLoading]
      )

      // const handleScrollEndDrag = useCallback(
      //   (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      //     const yOffset = e.nativeEvent.contentOffset.y
      //     artsListsHeightModel.updateListOffset({
      //       [type]: yOffset,
      //     })
      //   },
      //   [type, artsListsHeightModel]
      // )

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
          // onEndReached={onEndReached} //* NOT AVAILABLE ON ANDROID *
          data={list}
          onLayout={handleLayout}
          listKey={type}
          containerStyle={styles.container}
          getItemLayout={getItemLayout}
          ListEmptyComponent={
            currentListType === type && !isLoading
              ? UserDrawingsEmptyComponent
              : DrawingsListSkeleton
          }
          {...props}
          // onScrollEndDrag={handleScrollEndDrag}
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
