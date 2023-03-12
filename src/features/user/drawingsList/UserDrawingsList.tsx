import { useStore } from 'effector-react'
import React, { forwardRef, useCallback, useEffect } from 'react'
import { FlatList, LayoutChangeEvent, LogBox, StyleSheet } from 'react-native'
import {
  SCREEN_CONTENT_WIDTH,
  SCREEN_PADDING_HORIZONTAL,
} from '../../../styles/constants'
import Span from '../../../ui/Span'
import DrawingsList, {
  DRAWINGS_COLUMNS_COUNT,
  DRAWING_ITEM_MARGIN,
  DrawingFlatListProps,
} from '../../drawing/DrawingsList'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { UserDrawingListType, UserItem } from '../types'
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
} & DrawingFlatListProps &
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
        ...props
      },
      ref
    ) => {
      const styles = useThemedStyle(themedStyles)
      const { list } = useDrawingsList(item, type, artsListsRequestModel)

      const handleLayout = useCallback(
        (e: LayoutChangeEvent) => {
          const itemHeight =
            SCREEN_CONTENT_WIDTH / DRAWINGS_COLUMNS_COUNT +
            DRAWING_ITEM_MARGIN / 2

          const rowsCount = Math.ceil(list.length / DRAWINGS_COLUMNS_COUNT)

          artsListsHeightModel.updateListsHeight({
            [type]: list.length && rowsCount * itemHeight + 20,
          })

          onLayout?.(e)
        },
        [onLayout, type, artsListsHeightModel, list]
      )

      const handleScrollEndDrag = useCallback(
        (e) => {
          artsListsHeightModel.updateListOffset({
            [type]: e.nativeEvent.contentOffset.y,
          })
        },
        [onLayout, type, artsListsHeightModel]
      )

      return (
        <DrawingsList
          ref={ref}
          // onEndReached={getNext} // NOT AVAILABLE ON ANDROID
          data={list}
          onLayout={handleLayout}
          listKey={type}
          containerStyle={styles.container}
          onScrollEndDrag={handleScrollEndDrag}
          ListEmptyComponent={<Span label={'No drawings yet'} />}
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
